import React from 'react';
import _ from 'lodash';
import ROSLIB from 'roslib';
import Amphion from 'amphion';
import { MESSAGE_TYPE_TF, MESSAGE_TYPE_POSESTAMPED } from 'amphion/src/utils/constants';
import shortid from 'shortid';

import Sidebar from './sidebar';
import { ROS_SOCKET_STATUSES } from '../utils';
import Viewport from './viewport';
import AddModal from './addModal';

const { THREE } = window;

class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rosStatus: ROS_SOCKET_STATUSES.INITIAL,
      visualizations: [],
      addModalOpen: false,
      rosTopics: [],
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
  }

  componentDidMount() {
    this.ros.on('error', () => {
      this.setState({
        rosStatus: ROS_SOCKET_STATUSES.CONNECTION_ERROR
      });
    });

    this.ros.on('connection', () => {
      this.ros.getTopics((rosTopics) => {
        // const poseViz = new Amphion.Pose(this.ros, '/random_pose');
        // poseViz.subscribe();
        // console.log(poseViz);
        // this.scene.add(poseViz.object);

        // "/random_pose"
        // geometry_msgs/PoseStamped

        this.setState({
          rosStatus: ROS_SOCKET_STATUSES.CONNECTED,
          rosTopics,
        });
      });
    });

    this.ros.on('close', () => {
      this.setState({
        rosStatus: ROS_SOCKET_STATUSES.INITIAL
      });
    });
  }

  addLights() {
    [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach((positions) => {
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

  addVisualization(types) {
    const { visualizations, rosTopics: { topics, types: messageTypes } } = this.state;
    const defaultTopicIndex = _.findIndex(messageTypes, type => _.includes(types, type));
    const vizObject = this.getVisualization(topics[defaultTopicIndex], messageTypes[defaultTopicIndex]);
    window.vizObject = vizObject;
    vizObject.subscribe();
    this.scene.add(vizObject.object);
    this.setState({
      visualizations: [
        ...visualizations,
        {
          visible: true,
          object: vizObject,
          id: shortid.generate(),
        },
      ],
    });
  }

  getVisualization(name, messageType) {
    switch (messageType) {
      case MESSAGE_TYPE_TF:
        return new Amphion.Tf(this.ros, name);
      case MESSAGE_TYPE_POSESTAMPED:
        return new Amphion.Pose(this.ros, name);
    }
    return null;
  }

  connectRos(endpoint) {
    this.setState({
      rosStatus: ROS_SOCKET_STATUSES.CONNECTING
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
    const { addModalOpen, rosStatus, visualizations } = this.state;
    return (
      <div id="wrapper">
        {
          addModalOpen && (
            <AddModal closeModal={this.toggleAddModal} addVisualization={this.addVisualization} />
          )
        }
        <Sidebar
          rosStatus={rosStatus}
          connectRos={this.connectRos}
          disconnectRos={this.disconnectRos}
          visualizations={visualizations}
          toggleAddModal={this.toggleAddModal}
        />
        <Viewport camera={this.camera} scene={this.scene} />
      </div>
    );
  }
}

export default Wrapper;
