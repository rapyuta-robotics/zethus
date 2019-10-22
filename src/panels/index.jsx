import React from 'react';
import withGracefulUnmount from 'react-graceful-unmount';
import _ from 'lodash';
import ROSLIB from 'roslib';
import Amphion from 'amphion';

import { DEFAULT_CONFIG, ROS_SOCKET_STATUSES } from '../utils';

import { PanelWrapper, PanelContent } from '../components/styled';
import AddModal from './addModal';
import Sidebar from './sidebar';
import Viewport from './viewer';
import Visualization from './visualizations';
import ConfigurationModal from './configurationModal';

class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rosEndpoint: '',
      rosStatus: ROS_SOCKET_STATUSES.INITIAL,
      addModalOpen: false,
      configurationModalOpen: false,
      rosTopics: [],
      rosParams: [],
      framesList: [],
    };

    this.connectRos = this.connectRos.bind(this);
    this.disconnectRos = this.disconnectRos.bind(this);
    this.toggleAddModal = this.toggleAddModal.bind(this);
    this.refreshRosData = this.refreshRosData.bind(this);
    this.toggleConfigurationModal = this.toggleConfigurationModal.bind(this);
    this.addVisualization = this.addVisualization.bind(this);
    this.updateFramesList = this.updateFramesList.bind(this);
    this.updateConfiguration = this.updateConfiguration.bind(this);

    this.ros = new ROSLIB.Ros();
    this.viewer = new Amphion.TfViewer(this.ros, {
      onFramesListUpdate: this.updateFramesList,
    });
  }

  static getDerivedStateFromProps({ configuration }) {
    return {
      rosEndpoint: configuration.ros.endpoint,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { rosEndpoint } = this.state;
    if (prevState.rosEndpoint !== rosEndpoint) {
      this.disconnectRos();
      this.connectRos();
    }
  }

  componentDidMount() {
    const { rosEndpoint } = this.state;
    this.ros.on('error', () => {
      this.setState({
        rosStatus: ROS_SOCKET_STATUSES.CONNECTION_ERROR,
      });
    });

    this.ros.on('connection', this.refreshRosData);

    this.ros.on('close', () => {
      this.setState({
        rosStatus: ROS_SOCKET_STATUSES.INITIAL,
      });
    });

    if (rosEndpoint) {
      this.connectRos();
    }
  }

  updateFramesList(framesList) {
    this.setState({
      framesList: [...framesList],
    });
  }

  refreshRosData() {
    this.ros.getTopics(rosTopics => {
      this.setState({
        rosStatus: ROS_SOCKET_STATUSES.CONNECTED,
        rosTopics: _.map(rosTopics.topics, (name, index) => ({
          name,
          messageType: rosTopics.types[index],
        })),
      });
    });
    this.ros.getParams(rosParams => {
      this.setState({ rosParams: _.map(rosParams, p => _.trimStart(p, '/')) });
    });
  }

  componentWillUnmount() {
    this.viewer.destroy();
  }

  connectRos() {
    const { rosEndpoint } = this.state;
    this.setState({
      rosStatus: ROS_SOCKET_STATUSES.CONNECTING,
    });
    this.ros.connect(rosEndpoint);
  }

  disconnectRos() {
    if (this.ros && this.ros.close) {
      this.ros.close();
    }
  }

  toggleAddModal() {
    const { addModalOpen } = this.state;
    this.setState({
      addModalOpen: !addModalOpen,
    });
  }

  toggleConfigurationModal() {
    const { configurationModalOpen } = this.state;
    this.setState({
      configurationModalOpen: !configurationModalOpen,
    });
  }

  addVisualization(options) {
    const { addVisualization } = this.props;
    addVisualization(options);
    this.setState({
      addModalOpen: false,
    });
  }

  updateConfiguration(configuration) {
    const { updateConfiguration } = this.props;
    updateConfiguration(configuration);
    this.setState({
      configurationModalOpen: false,
    });
  }

  render() {
    const {
      addModalOpen,
      configurationModalOpen,
      framesList,
      rosEndpoint,
      rosParams,
      rosStatus,
      rosTopics,
    } = this.state;
    const {
      configuration: {
        globalOptions,
        panels: {
          sidebar: { display: displaySidebar },
        },
        visualizations,
      },
      configuration,
      removeVisualization,
      toggleVisibility,
      updateGlobalOptions,
      updateRosEndpoint,
      updateVizOptions,
    } = this.props;

    return (
      <PanelWrapper>
        {addModalOpen && (
          <AddModal
            ros={this.ros}
            rosTopics={rosTopics}
            rosParams={rosParams}
            closeModal={this.toggleAddModal}
            addVisualization={this.addVisualization}
          />
        )}
        {configurationModalOpen && (
          <ConfigurationModal
            configuration={configuration}
            updateConfiguration={this.updateConfiguration}
            closeModal={this.toggleConfigurationModal}
          />
        )}
        {displaySidebar && (
          <Sidebar
            framesList={framesList}
            globalOptions={globalOptions}
            rosEndpoint={rosEndpoint}
            rosInstance={this.ros}
            rosTopics={rosTopics}
            rosStatus={rosStatus}
            visualizations={visualizations}
            viewer={this.viewer}
            connectRos={this.connectRos}
            disconnectRos={this.disconnectRos}
            removeVisualization={removeVisualization}
            toggleAddModal={this.toggleAddModal}
            toggleVisibility={toggleVisibility}
            toggleConfigurationModal={this.toggleConfigurationModal}
            updateGlobalOptions={updateGlobalOptions}
            updateRosEndpoint={updateRosEndpoint}
            updateVizOptions={updateVizOptions}
          />
        )}
        <PanelContent>
          <Viewport viewer={this.viewer} globalOptions={globalOptions} />
        </PanelContent>
        {_.map(visualizations, vizItem => (
          <Visualization
            options={vizItem}
            key={vizItem.key}
            viewer={this.viewer}
            rosTopics={rosTopics}
            rosInstance={this.ros}
          />
        ))}
      </PanelWrapper>
    );
  }
}

Wrapper.defaultProps = {
  configuration: DEFAULT_CONFIG,
};

export default withGracefulUnmount(Wrapper);
