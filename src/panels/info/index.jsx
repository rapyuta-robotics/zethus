import React from 'react';
import ROSLIB from 'roslib';
import {
  find,
  findIndex,
  forEach,
  get,
  isEqual,
  isNil,
  map,
  size,
} from 'lodash';
import {
  InfoPanel,
  InfoPanelAddButton,
  InfoPanelContentWrapper,
  InfoPanelHeader,
  InfoPanelHeaderControls,
  InfoPanelTab,
  InfoPanelTabsWrapper,
} from '../../components/styled';
import Content from './content';
import { sanitizeMessage } from '../../utils/sanitize';
import AddInfoPanelModal from './addInfoPanelModal';

const MESSAGE_BUFFER_MAX_LENGTH = 1000;
const compressionTypes = new Set([
  'sensor_msgs/Image',
  'sensor_msgs/PointCloud2',
  'sensor_msgs/PointCloud',
  'sensor_msgs/LaserScan',
  'nav_msgs/Path',
  'nav_msgs/OccupancyGrid',
  'visualization_msgs/MarkerArray',
  'geometry_msgs/Polygon',
  'geometry_msgs/PolygonStamped',
  'geometry_msgs/PoseArray',
]);
const getTopicOptions = messageType => {
  if (compressionTypes.has(messageType)) {
    return {
      queue_length: 1,
      compression: 'cbor',
    };
  }

  return {
    queue_length: 1,
  };
};

class Info extends React.PureComponent {
  constructor(props) {
    super(props);

    const { topics } = props;
    this.topicInstances = {};
    this.messageBuffers = {};

    this.state = {
      selected: get(topics, '[0]', {}),
      raw: false,
      addModalOpen: false,
    };

    this.onMessage = this.onMessage.bind(this);
    this.onTabChange = this.onTabChange.bind(this);
    this.onRawClick = this.onRawClick.bind(this);
    this.toggleAddModal = this.toggleAddModal.bind(this);
    this.addInfoPanel = this.addInfoPanel.bind(this);
  }

  componentDidMount() {
    const { ros, topics } = this.props;

    forEach(topics, topic => {
      const topicInstance = new ROSLIB.Topic({
        ...topic,
        ros,
        ...getTopicOptions(topic.messageType),
      });
      topicInstance.subscribe(message => this.onMessage(topic, message));
      this.messageBuffers[topic.name] = [];
      this.topicInstances[topic.name] = topicInstance;
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let { selected } = prevState;
    if (isNil(find(nextProps.topics, t => t.name === selected.name))) {
      selected = size(nextProps.topics) > 0 ? nextProps.topics[0] : {};
    }
    return {
      ...prevState,
      selected,
      topics: nextProps.topics,
    };
  }

  componentDidUpdate(prevProps) {
    const { ros, topics } = this.props;

    if (isEqual(prevProps.topics, topics)) {
      return;
    }

    const newTopicNames = new Set(map(topics, t => t.name));
    const oldTopicNames = new Set(map(prevProps.topics, t => t.name));

    forEach(prevProps.topics, topic => {
      if (!newTopicNames.has(topic.name)) {
        this.topicInstances[topic.name].unsubscribe();
        delete this.messageBuffers[topic.name];
        delete this.topicInstances[topic.name];
      }
    });

    forEach(topics, topic => {
      if (!oldTopicNames.has(topic.name)) {
        const topicInstance = new ROSLIB.Topic({
          ...topic,
          ros,
          ...getTopicOptions(topic.messageType),
        });
        topicInstance.subscribe(message => this.onMessage(topic, message));
        this.messageBuffers[topic.name] = [];
        this.topicInstances[topic.name] = topicInstance;
      }
    });
  }

  onMessage(topic, message) {
    const { name } = topic;
    const buffer = this.messageBuffers[name];
    if (size(buffer) === MESSAGE_BUFFER_MAX_LENGTH) {
      buffer.pop();
    }

    const sanitizedMessage = sanitizeMessage(topic, message);
    sanitizedMessage.timestamp = performance.now();
    buffer.unshift(sanitizedMessage);
  }

  onTabChange(e, topic) {
    const {
      collapsed,
      togglePanelCollapse,
      topics,
      updateInfoTabs,
    } = this.props;
    const action = e.target.getAttribute('data-action');

    if (action === 'close') {
      const topicsShallowClone = [...topics];
      const index = findIndex(topicsShallowClone, x => x.name === topic.name);
      topicsShallowClone.splice(index, 1);
      updateInfoTabs(topicsShallowClone);
    } else {
      this.setState({ selected: topic }, () => {
        if (collapsed) {
          togglePanelCollapse('info');
        }
      });
    }
  }

  onRawClick(e) {
    this.setState({ raw: e.target.checked || false });
  }

  toggleAddModal(addModalOpen) {
    this.setState({ addModalOpen });
  }

  addInfoPanel(topic, keys) {
    const {
      collapsed,
      togglePanelCollapse,
      topics,
      updateInfoTabs,
    } = this.props;
    const topicsShallowClone = [...topics];
    topic.keys = keys;
    topicsShallowClone.push(topic);
    if (collapsed) {
      togglePanelCollapse('info');
    }
    setTimeout(() => updateInfoTabs(topicsShallowClone), 0);
    this.toggleAddModal(false);
  }

  render() {
    const { addModalOpen, raw, selected } = this.state;
    const {
      collapsed,
      rosTopics: allTopics,
      togglePanelCollapse,
      topics,
    } = this.props;

    return (
      <>
        <InfoPanel>
          <InfoPanelHeader>
            <InfoPanelTabsWrapper>
              {map(topics, t => (
                <InfoPanelTab
                  selected={t.name === selected.name}
                  key={t.name}
                  onClick={e => this.onTabChange(e, t)}
                >
                  <span>{t.name}</span>
                  <span data-action="close">&#8855;</span>
                </InfoPanelTab>
              ))}
              <InfoPanelAddButton onClick={() => this.toggleAddModal(true)}>
                +
              </InfoPanelAddButton>
            </InfoPanelTabsWrapper>
            <InfoPanelHeaderControls>
              <label>
                Raw:
                <input type="checkbox" value={raw} onChange={this.onRawClick} />
              </label>
              <span onClick={() => togglePanelCollapse('info')}>
                {collapsed ? 'Expand' : 'Collapse'} {collapsed ? '▲' : '▼'}
              </span>
            </InfoPanelHeaderControls>
          </InfoPanelHeader>
          <InfoPanelContentWrapper collapsed={collapsed}>
            <Content
              raw={raw}
              messageBuffers={this.messageBuffers}
              selected={selected}
              openAddInfoPanel={() => this.toggleAddModal(true)}
            />
          </InfoPanelContentWrapper>
        </InfoPanel>
        <AddInfoPanelModal
          open={addModalOpen}
          topics={topics}
          allTopics={allTopics}
          closeModal={() => this.toggleAddModal(false)}
          onAdd={this.addInfoPanel}
        />
      </>
    );
  }
}

export default Info;
