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

const MESSAGE_BUFFER_MAX_LENGTH = 5;

class Info extends React.PureComponent {
  constructor(props) {
    super(props);

    const { topics } = props;
    this.topicInstances = {};
    this.messageBuffers = {};

    this.state = {
      selected: get(topics, '[0].name', null),
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
      const topicInstance = new ROSLIB.Topic({ ...topic, ros });
      topicInstance.subscribe(message => this.onMessage(topic, message));
      this.messageBuffers[topic.name] = [];
      this.topicInstances[topic.name] = topicInstance;
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let { selected } = prevState;
    if (isNil(find(nextProps.topics, t => t.name === selected))) {
      selected = size(nextProps.topics) > 0 ? nextProps.topics[0].name : null;
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
        const topicInstance = new ROSLIB.Topic({ ...topic, ros });
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
      buffer.shift();
    }
    buffer.push(sanitizeMessage(topic, message));
  }

  onTabChange(e, name) {
    const { topics, updateInfoTabs } = this.props;
    const action = e.target.getAttribute('data-action');

    if (action === 'close') {
      const topicsShallowClone = [...topics];
      const index = findIndex(topicsShallowClone, x => x.name === name);
      topicsShallowClone.splice(index, 1);
      updateInfoTabs(topicsShallowClone);
    } else {
      this.setState({ selected: name });
    }
  }

  onRawClick(e) {
    this.setState({ raw: e.target.checked || false });
  }

  toggleAddModal(addModalOpen) {
    this.setState({ addModalOpen });
  }

  addInfoPanel(topic) {
    const { topics, updateInfoTabs } = this.props;
    const topicsShallowClone = [...topics];
    topicsShallowClone.push(topic);
    updateInfoTabs(topicsShallowClone);
    this.toggleAddModal(false);
  }

  render() {
    const { addModalOpen, raw, selected } = this.state;
    const { collapsed, rosTopics, togglePanelCollapse, topics } = this.props;

    return (
      <>
        <InfoPanel>
          <InfoPanelHeader>
            <InfoPanelTabsWrapper>
              {map(topics, t => (
                <InfoPanelTab
                  selected={t.name === selected}
                  key={t.name}
                  onClick={e => this.onTabChange(e, t.name)}
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
              <span>
                Raw:{' '}
                <input type="checkbox" value={raw} onChange={this.onRawClick} />
              </span>
              <span onClick={() => togglePanelCollapse('info')}>
                Collapse {collapsed ? '▲' : '▼'}
              </span>
            </InfoPanelHeaderControls>
          </InfoPanelHeader>
          <InfoPanelContentWrapper collapsed={collapsed}>
            <Content
              raw={raw}
              messageBuffers={this.messageBuffers}
              selected={selected}
            />
          </InfoPanelContentWrapper>
        </InfoPanel>
        <AddInfoPanelModal
          open={addModalOpen}
          topics={topics}
          rosTopics={rosTopics}
          closeModal={() => this.toggleAddModal(false)}
          onAdd={this.addInfoPanel}
        />
      </>
    );
  }
}

export default Info;
