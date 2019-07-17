import React from 'react';
import withGracefulUnmount from 'react-graceful-unmount';
import _ from 'lodash';
import ROSLIB from 'roslib';
import Amphion from 'amphion';

import {
  MESSAGE_TYPE_TF,
  MESSAGE_TYPE_TF2,
  MESSAGE_TYPE_POSESTAMPED,
  MESSAGE_TYPE_MARKERARRAY,
  MESSAGE_TYPE_LASERSCAN,
  MESSAGE_TYPE_POINTCLOUD2,
  MESSAGE_TYPE_DISPLAYJOINTSTATE,
  MESSAGE_TYPE_ROBOT_MODEL,
  MESSAGE_TYPE_OCCUPANCYGRID,
  MESSAGE_TYPE_POSEARRAY,
  MESSAGE_TYPE_ODOMETRY,
  MESSAGE_TYPE_PATH,
  MESSAGE_TYPE_IMAGE,
  MESSAGE_TYPE_MARKER,
  MESSAGE_TYPE_POINTCLOUD,
} from 'amphion/src/utils/constants';
import shortid from 'shortid';

import Sidebar from '../views/sidebar';
import { ROS_SOCKET_STATUSES, vizOptions } from '../utils';
import Viewport from './viewport';
import AddModal from './addModal';
import ImageHolder from './ImageHolder';

class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rosStatus: ROS_SOCKET_STATUSES.INITIAL,
      visualizations: [],
      addModalOpen: false,
      rosTopics: {},
    };
    this.ros = new ROSLIB.Ros();
    this.viewer = new Amphion.TfViewer(this.ros);

    this.connectRos = this.connectRos.bind(this);
    this.disconnectRos = this.disconnectRos.bind(this);
    this.addVizObjectToViewer = this.addVizObjectToViewer.bind(this);
    this.addVisualization = this.addVisualization.bind(this);
    this.toggleAddModal = this.toggleAddModal.bind(this);
    this.getVisualization = this.getVisualization.bind(this);
    this.removeDisplayType = this.removeDisplayType.bind(this);
    this.setPrevConfig = this.setPrevConfig.bind(this);
    this.updateTopic = this.updateTopic.bind(this);
    this.updateOptions = this.updateOptions.bind(this);
    this.updateVisibilty = this.updateVisibilty.bind(this);
    this.addVisualizationByTopic = this.addVisualizationByTopic.bind(this);
  }

  setPrevConfig() {
    const visualizations = [];
    visualizations.forEach((viz, idx) => {
      const { name, type, isDisplay, options } = viz;
      const vizObject = this.getVisualization(
        name,
        type,
        isDisplay,
        options || {},
      );

      if (!isDisplay) {
        this.addVizObjectToViewer(vizObject.object);
      }
      if (vizObject.subscribe) {
        vizObject.subscribe();
      }

      visualizations[idx].rosObject = vizObject;
    });

    this.setState({ visualizations });
  }

  destroyVizOnDisconnect() {
    const { visualizations } = this.state;
    visualizations.forEach(viz => {
      const { rosObject } = viz;
      rosObject.destroy();
    });
  }

  componentDidMount() {
    this.ros.on('error', () => {
      this.setState({
        rosStatus: ROS_SOCKET_STATUSES.CONNECTION_ERROR,
      });
    });

    this.ros.on('connection', () => {
      this.ros.getTopics(rosTopics => {
        this.setState({
          rosStatus: ROS_SOCKET_STATUSES.CONNECTED,
          rosTopics,
        });
        this.setPrevConfig();
      });
    });

    this.ros.on('close', () => {
      this.destroyVizOnDisconnect();
      this.setState({
        rosStatus: ROS_SOCKET_STATUSES.INITIAL,
      });
    });
  }

  componentWillUnmount() {
    const { visualizations } = this.state;
    localStorage.setItem(
      'visualizations',
      JSON.stringify(
        _.map(
          visualizations,
          ({ visible, id, name, type, displayName, isDisplay, options }) => ({
            visible,
            id,
            name,
            type,
            displayName,
            isDisplay,
            options,
          }),
        ),
      ),
    );
    this.viewer.destroy();
  }

  updateTopic(id, name) {
    const { visualizations } = this.state;
    this.setState({
      visualizations: _.map(visualizations, viz => {
        if (viz.id === id) {
          viz.name = name;
          return { ...viz };
        }

        return viz;
      }),
    });
  }

  updateVisibilty(id, visible) {
    const { visualizations } = this.state;
    this.setState({
      visualizations: _.map(visualizations, viz =>
        viz.id === id ? { ...viz, visible } : viz,
      ),
    });
  }

  updateOptions(id, options) {
    const { visualizations } = this.state;
    this.setState({
      visualizations: _.map(visualizations, viz => {
        if (viz.id === id) {
          viz.rosObject.updateOptions(options);
          return { ...viz, options };
        }

        return viz;
      }),
    });
  }

  getVisualization(name, messageType, isDisplay, options) {
    if (isDisplay) {
      switch (messageType) {
        case MESSAGE_TYPE_DISPLAYJOINTSTATE:
          return new Amphion.DisplayJointState(this.ros, name, this.robot);
        default:
          return null;
      }
    }
    switch (messageType) {
      case MESSAGE_TYPE_ROBOT_MODEL: {
        const robotModel = new Amphion.RobotModel(
          this.ros,
          options.paramName || 'robot_description',
          {
            packages: {
              franka_description:
                'https://storage.googleapis.com/kompose-artifacts/franka_description',
            },
          },
        );
        this.viewer.addRobot(robotModel);
        return robotModel;
      }
      case MESSAGE_TYPE_TF:
      case MESSAGE_TYPE_TF2:
        return new Amphion.Tf(this.ros);
      case MESSAGE_TYPE_OCCUPANCYGRID:
        return new Amphion.Map(this.ros, name, options);
      case MESSAGE_TYPE_POSESTAMPED:
        return new Amphion.Pose(this.ros, name, options);
      case MESSAGE_TYPE_POSEARRAY:
        return new Amphion.PoseArray(this.ros, name, options);
      case MESSAGE_TYPE_MARKER:
        return new Amphion.Marker(this.ros, name, options);
      case MESSAGE_TYPE_MARKERARRAY:
        return new Amphion.MarkerArray(this.ros, name, options);
      case MESSAGE_TYPE_LASERSCAN:
        return new Amphion.LaserScan(this.ros, name, options);
      case MESSAGE_TYPE_POINTCLOUD2:
      case MESSAGE_TYPE_POINTCLOUD:
        return new Amphion.PointCloud(this.ros, name, messageType, options);
      case MESSAGE_TYPE_ODOMETRY:
        return new Amphion.Odometry(this.ros, name, options);
      case MESSAGE_TYPE_PATH:
        return new Amphion.Path(this.ros, name, options);
      case MESSAGE_TYPE_IMAGE:
        return new Amphion.Image(this.ros, name, options);
      default:
        return null;
    }
  }

  addVisualization({ types, isDisplay, displayName, options }) {
    const {
      rosTopics: { topics, types: messageTypes },
    } = this.state;
    const defaultTopicIndex = _.findIndex(messageTypes, type =>
      _.includes(types, type),
    );

    const [name, type] = [
      topics[defaultTopicIndex],
      messageTypes[defaultTopicIndex] || types[0],
    ];
    this.addVisualizationByTopic({
      name,
      type,
      isDisplay,
      displayName,
      options,
    });
  }

  addVisualizationByTopic({ name, type, isDisplay, displayName, options }) {
    const { visualizations } = this.state;

    const vizObject = this.getVisualization(name, type, isDisplay, options);
    if (type !== MESSAGE_TYPE_ROBOT_MODEL) {
      this.addVizObjectToViewer(vizObject);
    }
    if (vizObject.topic) {
      vizObject.subscribe();
    }
    this.setState({
      visualizations: [
        ...visualizations,
        {
          visible: true,
          rosObject: vizObject,
          id: shortid.generate(),
          name,
          type,
          displayName,
          isDisplay,
          options,
          icon: _.find(vizOptions, v => v.name === displayName).icon,
        },
      ],
    });
  }

  addVizObjectToViewer(vizObject) {
    this.viewer.addVisualization(vizObject);
  }

  removeDisplayType(id) {
    const { visualizations } = this.state;

    const viz = _.find(visualizations, v => v.id === id);
    if (viz.type === MESSAGE_TYPE_ROBOT_MODEL) {
      _.each(this.robotMeshes, mesh => {
        mesh.parent.remove(mesh);
      });
      this.robotMeshes = [];
    }
    viz.rosObject.destroy();

    this.setState({
      visualizations: _.filter(visualizations, v => v.id !== id),
    });
  }

  connectRos(endpoint) {
    this.setState({
      rosStatus: ROS_SOCKET_STATUSES.CONNECTING,
    });
    this.ros.connect(endpoint);
  }

  disconnectRos() {
    this.ros.close();
  }

  toggleAddModal() {
    const { addModalOpen } = this.state;
    this.setState({
      addModalOpen: !addModalOpen,
    });
  }

  render() {
    const { addModalOpen, rosStatus, visualizations, rosTopics } = this.state;
    return (
      <div id="wrapper">
        {addModalOpen && (
          <AddModal
            rosTopics={rosTopics}
            closeModal={this.toggleAddModal}
            addVisualization={this.addVisualization}
            addVisualizationByTopic={this.addVisualizationByTopic}
          />
        )}
        <Sidebar
          viewer={this.viewer}
          updateTopic={this.updateTopic}
          updateOptions={this.updateOptions}
          updateVisibilty={this.updateVisibilty}
          rosStatus={rosStatus}
          connectRos={this.connectRos}
          disconnectRos={this.disconnectRos}
          visualizations={visualizations}
          ros={this.ros}
          toggleAddModal={this.toggleAddModal}
          removeDisplayType={this.removeDisplayType}
          rosTopics={rosTopics}
        />
        <Viewport viewer={this.viewer} />
        <ImageHolder
          visualizations={visualizations}
          updateVisibilty={this.updateVisibilty}
        />
      </div>
    );
  }
}

export default withGracefulUnmount(Wrapper);
