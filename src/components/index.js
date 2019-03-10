import React from 'react';
import ROSLIB from 'roslib';
import Header from "./header";
import Scene from './scene';

export const ROS_SOCKET_STATUSES = {
  INITIAL: 0,
  CONNECTING: 1,
  CONNECTED: 2,
  CONNECTION_ERROR: 3,
};

class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rosStatus: ROS_SOCKET_STATUSES.INITIAL,
    };
    this.ros = new ROSLIB.Ros();
    this.connectRos = this.connectRos.bind(this);
    this.disconnectRos = this.disconnectRos.bind(this);
  }
  connectRos(endpoint) {

  }
  disconnectRos() {

  }
  render() {
    const { rosStatus } = this.state;
    return (
      <div id="wrapper">
        <Header
          rosStatus={rosStatus}
          connectRos={this.connectRos}
          disconnectRos={this.disconnectRos}
        />
        <Scene />
      </div>
    )
  }
}

export default Wrapper;
