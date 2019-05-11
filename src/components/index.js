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

import Sidebar from './sidebar';
import { ROS_SOCKET_STATUSES } from '../utils';
import Viewport from './viewport';
import AddModal from './addModal';
import ImageHolder from './ImageHolder';

const { THREE } = window;

const excludedObjects = [
  'PerspectiveCamera',
  'OrthographicCamera',
  'AmbientLight',
  'DirectionalLight',
  'HemisphereLight',
  'Light',
  'RectAreaLight',
  'SpotLight',
  'PointLight',
];

const removeExcludedObjects = mesh => {
  const objectArray = [mesh];
  while (_.size(objectArray) > 0) {
    const currentItem = objectArray.shift();
    _.each(currentItem.children, child => {
      if (!child) {
        return;
      }
      if (_.includes(excludedObjects, child.type)) {
        const { parent } = child;
        parent.children = _.filter(parent.children, c => c !== child);
      } else {
        objectArray.push(child);
      }
    });
  }
};

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
    this.scene = new THREE.Scene();
    this.robotMeshes = [];
    window.scene = this.scene;
    this.vizWrapper = new THREE.Group();
    this.scene.add(this.vizWrapper);
    this.addLights();
    this.addCamera();

    this.connectRos = this.connectRos.bind(this);
    this.disconnectRos = this.disconnectRos.bind(this);
    this.addVizObjectToScene = this.addVizObjectToScene.bind(this);
    this.addVisualization = this.addVisualization.bind(this);
    this.toggleAddModal = this.toggleAddModal.bind(this);
    this.getVisualization = this.getVisualization.bind(this);
    this.removeDisplayType = this.removeDisplayType.bind(this);
    this.toggleEditorControls = this.toggleEditorControls.bind(this);
    this.publishNavMessages = this.publishNavMessages.bind(this);
    this.setPrevConfig = this.setPrevConfig.bind(this);
    this.updateTopic = this.updateTopic.bind(this);
    this.updateOptions = this.updateOptions.bind(this);
    this.updateVisibilty = this.updateVisibilty.bind(this);
  }

  setPrevConfig() {
    let visualizations = localStorage.getItem('visualizations') || '[]';
    visualizations = JSON.parse(visualizations);
    visualizations.forEach((viz, idx) => {
      const { name, type, isDisplay, options } = viz;
      const vizObject = this.getVisualization(
        name,
        type,
        isDisplay,
        options || {},
      );

      if (!isDisplay) {
        this.addVizObjectToScene(vizObject.object);
      }
      if (vizObject.subscribe) {
        vizObject.subscribe();
      }

      visualizations[idx].rosObject = vizObject;
    });

    this.setState({ visualizations });
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

      const displayTfObject = new Amphion.DisplayTf(this.ros, this.vizWrapper);
      displayTfObject.subscribe();
    });

    this.ros.on('close', () => {
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
        );
        robotModel.load(
          object => {
            removeExcludedObjects(object);
            _.each(object.children[0].links, o => {
              const existingObject = this.vizWrapper.getObjectByName(o.name);
              if (existingObject) {
                o.children.forEach(child => {
                  existingObject.add(child);
                });
              }
            });
          },
          {
            packages: _.mapValues(
              _.keyBy(options.packages || {}, 'name'),
              'value',
            ),
            loadMeshCb: (path, ext, done) => {
              robotModel.defaultMeshLoader(path, ext, mesh => {
                removeExcludedObjects(mesh);
                this.robotMeshes.push(mesh);
                done(mesh);
              });
            },
            fetchOptions: { mode: 'cors', credentials: 'same-origin' },
          },
        );
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
        return new Amphion.DisplayOdometry(this.ros, name, options);
      case MESSAGE_TYPE_PATH:
        return new Amphion.Path(this.ros, name, options);
      case MESSAGE_TYPE_IMAGE:
        return new Amphion.Image(this.ros, name, options);
      default:
        return null;
    }
  }

  addVisualization(types, isDisplay, displayName, options) {
    const {
      visualizations,
      rosTopics: { topics, types: messageTypes },
    } = this.state;
    const defaultTopicIndex = _.findIndex(messageTypes, type =>
      _.includes(types, type),
    );

    const [name, type] = [
      topics[defaultTopicIndex],
      messageTypes[defaultTopicIndex] || types[0],
    ];
    const vizObject = this.getVisualization(name, type, isDisplay, options);
    if (!isDisplay) {
      this.addVizObjectToScene(vizObject.object);
    }
    vizObject.onHeaderChange = newFrameId => {
      let frameObject = this.vizWrapper.getObjectByName(newFrameId);
      if (!frameObject) {
        frameObject = new THREE.Group();
        this.vizWrapper.add(frameObject);
      }
      frameObject.add(vizObject.object);
    };
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
        },
      ],
    });
  }

  addVizObjectToScene(object) {
    if (!this.vizWrapper.getObjectById(object.id)) {
      this.vizWrapper.add(object);
    }
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

  addLights() {
    [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(positions => {
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
      [directionalLight.position.x, directionalLight.position.y] = positions;
      directionalLight.position.z = 1;
      this.scene.add(directionalLight);
    });
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    this.scene.add(ambientLight);

    const axesHelper = new THREE.AxesHelper(5);
    axesHelper.material.linewidth = 2;
    this.scene.add(axesHelper);
  }

  addCamera() {
    this.camera = new THREE.PerspectiveCamera(50, 1, 0.01, 1000);
    this.camera.position.set(0, 5, 10);
    this.camera.up.set(0, 0, 1);
    this.camera.lookAt(new THREE.Vector3());

    this.scene.add(this.camera);
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

  toggleEditorControls(enabled, topicName) {
    if (enabled) {
      this.viewportRef.enableEditorControls();
    } else {
      this.viewportRef.disableEditorControls(topicName);
    }
  }

  publishNavMessages(msg, topic, messageType) {
    const nav2D = new ROSLIB.Topic({
      ros: this.ros,
      name: topic,
      messageType,
    });
    const poseMsg = new ROSLIB.Message({
      ...msg,
    });

    nav2D.publish(poseMsg);
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
          />
        )}
        <Sidebar
          vizWrapper={this.vizWrapper}
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
          toggleEditorControls={this.toggleEditorControls}
          rosTopics={rosTopics}
        />
        <Viewport
          camera={this.camera}
          scene={this.scene}
          publishNavMessages={this.publishNavMessages}
          onRef={ref => {
            this.viewportRef = ref;
          }}
        />
        <ImageHolder
          visualizations={visualizations}
          updateVisibilty={this.updateVisibilty}
        />
      </div>
    );
  }
}

export default withGracefulUnmount(Wrapper);
