import React from 'react';
import _ from 'lodash';
import ROSLIB from 'roslib';
import Amphion from 'amphion';
// import URDFLoader from 'urdf-loader';
import {
  MESSAGE_TYPE_TF,
  MESSAGE_TYPE_POSESTAMPED,
  MESSAGE_TYPE_MARKERARRAY,
  MESSAGE_TYPE_LASERSCAN,
  MESSAGE_TYPE_POINTCLOUD2,
  MESSAGE_TYPE_DISPLAYTF,
  MESSAGE_TYPE_DISPLAYJOINTSTATE,
  MESSAGE_TYPE_ROBOT_MODEL,
  MESSAGE_TYPE_OCCUPANCYGRID,
  MESSAGE_TYPE_POSEARRAY,
  MESSAGE_TYPE_ODOMETRY,
} from 'amphion/src/utils/constants';
import shortid from 'shortid';

import Sidebar from './sidebar';
import { ROS_SOCKET_STATUSES } from '../utils';
import Viewport from './viewport';
import AddModal from './addModal';
import { posix } from 'upath';

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
    this.addLights();
    this.addCamera();

    this.connectRos = this.connectRos.bind(this);
    this.disconnectRos = this.disconnectRos.bind(this);
    this.addVisualization = this.addVisualization.bind(this);
    this.toggleAddModal = this.toggleAddModal.bind(this);
    this.getVisualization = this.getVisualization.bind(this);
    this.removeDisplayType = this.removeDisplayType.bind(this);
    this.toggleEditorControls = this.toggleEditorControls.bind(this);
    this.publishNavMessages = this.publishNavMessages.bind(this);
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
      });
    });

    this.ros.on('close', () => {
      this.setState({
        rosStatus: ROS_SOCKET_STATUSES.INITIAL,
      });
    });
  }

  getVisualization(name, messageType, isDisplay, options) {
    if (isDisplay) {
      switch (messageType) {
        case MESSAGE_TYPE_DISPLAYTF:
          return new Amphion.DisplayTf(this.ros, name, this.scene);
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
          },
          {
            packages: _.mapValues(
              _.keyBy(options.packages || {}, 'name'),
              'value',
            ),
            loadMeshCb: (path, ext, done) => {
              robotModel.defaultMeshLoader(path, ext, mesh => {
                removeExcludedObjects(mesh);
                done(mesh);
              });
            },
            fetchOptions: { mode: 'cors', credentials: 'same-origin' },
          },
        );
        return robotModel;
      }
      case MESSAGE_TYPE_TF:
        return new Amphion.Tf(this.ros, name);
      case MESSAGE_TYPE_OCCUPANCYGRID:
        return new Amphion.Map(this.ros, name);
      case MESSAGE_TYPE_POSESTAMPED:
        return new Amphion.Pose(this.ros, name);
      case MESSAGE_TYPE_POSEARRAY:
        return new Amphion.PoseArray(this.ros, name);
      case MESSAGE_TYPE_MARKERARRAY:
        return new Amphion.MarkerArray(this.ros, name);
      case MESSAGE_TYPE_LASERSCAN:
        return new Amphion.LaserScan(this.ros, name);
      case MESSAGE_TYPE_POINTCLOUD2:
        return new Amphion.PointCloud(this.ros, name);
      case MESSAGE_TYPE_ODOMETRY:
        return new Amphion.DisplayOdometry(this.ros, name);
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
      this.scene.add(vizObject.object);
    }
    if (vizObject.subscribe) {
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
        },
      ],
    });
  }

  removeDisplayType(id) {
    const { visualizations } = this.state;

    let vizArrayClone = [...visualizations];
    vizArrayClone = _.reject(vizArrayClone, vizObject => {
      if (vizObject.id === id) {
        vizObject.rosObject.destroy();
        return true;
      }
      return false;
    });

    this.setState({ visualizations: vizArrayClone });
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
          rosStatus={rosStatus}
          connectRos={this.connectRos}
          disconnectRos={this.disconnectRos}
          visualizations={visualizations}
          ros={this.ros}
          toggleAddModal={this.toggleAddModal}
          removeDisplayType={this.removeDisplayType}
          toggleEditorControls={this.toggleEditorControls}
        />
        <Viewport
          camera={this.camera}
          scene={this.scene}
          publishNavMessages={this.publishNavMessages}
          onRef={ref => {
            this.viewportRef = ref;
          }}
        />
      </div>
    );
  }
}

export default Wrapper;
