import React from 'react';
import withGracefulUnmount from 'react-graceful-unmount';
import _, { isNil } from 'lodash';
import ROSLIB from 'roslib';
import Amphion from 'amphion';

import { DEFAULT_CONFIG, ROS_SOCKET_STATUSES } from '../utils';

import {
  AddInfoPanelTagsInputStyle,
  PanelContent,
  PanelWrapper,
  ViewportWrapper,
} from '../components/styled';
import AddModal from './addModal';
import Sidebar from './sidebar';
import Viewport from './viewer';
import Visualization from './visualizations';
import ConfigurationModal from './configurationModal';
import Header from './header';
import { TOOL_TYPE_CONTROLS } from '../utils/common';
import Raycaster from '../utils/raycaster';
import { TOOL_TYPE } from '../utils/toolbar';
import ToolPublisher from '../utils/toolPublisher';
import Info from './info';

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
      activeTool: TOOL_TYPE_CONTROLS,
    };

    this.connectRos = this.connectRos.bind(this);
    this.disconnectRos = this.disconnectRos.bind(this);
    this.toggleAddModal = this.toggleAddModal.bind(this);
    this.refreshRosData = this.refreshRosData.bind(this);
    this.toggleConfigurationModal = this.toggleConfigurationModal.bind(this);
    this.addVisualization = this.addVisualization.bind(this);
    this.updateFramesList = this.updateFramesList.bind(this);
    this.updateConfiguration = this.updateConfiguration.bind(this);
    this.composePose = this.composePose.bind(this);
    this.selectTool = this.selectTool.bind(this);
    this.onPointTool = this.onPointTool.bind(this);
    this.onPoseEstimateTool = this.onPoseEstimateTool.bind(this);
    this.onNavGoalTool = this.onNavGoalTool.bind(this);
    this.togglePanelCollapse = this.togglePanelCollapse.bind(this);
    this.updateInfoTabs = this.updateInfoTabs.bind(this);

    this.ros = new ROSLIB.Ros();
    this.viewer = new Amphion.TfViewer(this.ros, {
      onFramesListUpdate: this.updateFramesList,
    });
    this.toolPublisher = new ToolPublisher(this.ros);
  }

  static getDerivedStateFromProps({ configuration }) {
    return {
      rosEndpoint: configuration.ros.endpoint,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { activeTool, rosEndpoint } = this.state;
    const {
      configuration: {
        globalOptions: {
          fixedFrame: { value: fixedFrame },
        },
      },
    } = this.props;
    const {
      configuration: {
        globalOptions: {
          fixedFrame: { value: previousFixedFrame },
        },
      },
    } = prevProps;

    if (this.raycaster && previousFixedFrame !== fixedFrame) {
      this.raycaster.fixedFrame = fixedFrame;
    }

    if (prevState.rosEndpoint !== rosEndpoint) {
      this.disconnectRos();
      this.connectRos();
    }

    if (activeTool !== prevState.activeTool) {
      this.viewer.controls.enabled = false;

      switch (activeTool) {
        case TOOL_TYPE_CONTROLS: {
          this.viewer.controls.enabled = true;
          break;
        }
        default: {
          // TODO: add other tool cases
        }
      }
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

    const { camera, renderer, scene } = this.viewer;
    scene.grid.raycast = () => undefined;
    this.raycaster = new Raycaster(camera, scene, renderer.domElement);
  }

  selectTool(name, type) {
    this.setState({ activeTool: type });
    this.raycaster.tool = { name, type };

    switch (type) {
      case TOOL_TYPE.TOOL_TYPE_POINT: {
        this.raycaster.addOrReplaceEventListener(name, this.onPointTool);
        break;
      }
      case TOOL_TYPE.TOOL_TYPE_NAV_GOAL: {
        this.raycaster.addOrReplaceEventListener(name, this.onNavGoalTool);
        break;
      }
      case TOOL_TYPE.TOOL_TYPE_POSE_ESTIMATE: {
        this.raycaster.addOrReplaceEventListener(name, this.onPoseEstimateTool);
        break;
      }
      case TOOL_TYPE.TOOL_TYPE_CONTROLS:
      default:
    }
  }

  composePose(position, quaternion) {
    const [x, y, z] = position.toArray();
    const [ox, oy, oz, ow] = quaternion.toArray();
    return {
      position: {
        x,
        y,
        z,
      },
      orientation: {
        x: ox,
        y: oy,
        z: oz,
        w: ow,
      },
    };
  }

  onPoseEstimateTool(position, quaternion, frameId) {
    const pose = this.composePose(position, quaternion);
    this.toolPublisher.publishPoseEstimateToolMessage(pose, frameId);
  }

  onNavGoalTool(position, quaternion, frameId) {
    const pose = this.composePose(position, quaternion);
    this.toolPublisher.publishNavGoalToolMessage(pose, frameId);
  }

  onPointTool(point, frameId) {
    const [x, y, z] = point.toArray();
    this.toolPublisher.publishPointToolMessage({ x, y, z }, frameId);
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

  updateConfiguration(configuration, replaceOnExisting) {
    const { updateConfiguration } = this.props;
    updateConfiguration(configuration, replaceOnExisting);
    this.setState({
      configurationModalOpen: false,
    });
  }

  togglePanelCollapse(panelName) {
    const {
      configuration: {
        panels: {
          [panelName]: { collapsed },
        },
      },
    } = this.props;

    if (!isNil(panelName)) {
      this.updateConfiguration({
        panels: {
          [panelName]: { collapsed: !collapsed },
        },
      });
    }
  }

  updateInfoTabs(infoTabs) {
    if (isNil(infoTabs)) {
      return;
    }

    this.updateConfiguration(
      {
        infoTabs,
      },
      true,
    );
  }

  render() {
    const {
      activeTool,
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
        infoTabs,
        panels: {
          header: { display: displayHeader },
          info: { collapsed: collapsedInfo, display: displayInfo },
          sidebar: { collapsed: collapsedSidebar, display: displaySidebar },
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
      <>
        <AddInfoPanelTagsInputStyle />
        {displayHeader && (
          <Header activeTool={activeTool} selectTool={this.selectTool} />
        )}
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
              collapsedSidebar={collapsedSidebar}
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
              togglePanelCollapse={this.togglePanelCollapse}
              toggleConfigurationModal={this.toggleConfigurationModal}
              updateGlobalOptions={updateGlobalOptions}
              updateRosEndpoint={updateRosEndpoint}
              updateVizOptions={updateVizOptions}
            />
          )}
          <PanelContent>
            <ViewportWrapper>
              <Viewport viewer={this.viewer} globalOptions={globalOptions} />
            </ViewportWrapper>
            {displayInfo && (
              <Info
                ros={this.ros}
                collapsed={collapsedInfo}
                rosTopics={rosTopics}
                updateInfoTabs={this.updateInfoTabs}
                togglePanelCollapse={this.togglePanelCollapse}
                topics={infoTabs}
              />
            )}
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
      </>
    );
  }
}

Wrapper.defaultProps = {
  configuration: DEFAULT_CONFIG,
};

export default withGracefulUnmount(Wrapper);
