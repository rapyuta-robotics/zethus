import React from 'react';
import ROSLIB from 'roslib';
import { cpus } from 'os';
import Header from './header';
import Scene from './scene';
import { ROS_SOCKET_STATUSES } from './ros';
import Simulator from './simulation';
import { getCompositionDetailsApi } from './api';

const statuses = {
  loading: 0,
  error: 1,
  success: 2,
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

    this.setROSConnHandlers();
  }

  async componentDidMount() {
    const { match: { params: { composition_id: compId } } } = this.props;
    console.log('test', compId);
    try {
      const { data: compositionDetails } = await getCompositionDetailsApi(compId);
      this.setState({
        compositionDetails,
        status: statuses.success,
      });
    } catch (e) {
      this.setState({
        status: statuses.error,
      });
    }
  }

  // Set ROSBridge connection handler to handle events like
  // 'error', 'connection', 'close'
  setROSConnHandlers() {
    this.ros.on('error', (data) => {
      this.setState({
        rosStatus: ROS_SOCKET_STATUSES.CONNECTION_ERROR
      });
    });

    this.ros.on('connection', (data) => {
      this.setState({
        rosStatus: ROS_SOCKET_STATUSES.CONNECTED
      });
    });

    this.ros.on('close', (data) => {
      this.setState({
        rosStatus: ROS_SOCKET_STATUSES.INITIAL
      });
    });
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

  render() {
    const { rosStatus } = this.state;
    const compositionDetails = null;
    return (
      <div id="wrapper">
        <Header
          rosStatus={rosStatus}
          connectRos={this.connectRos}
          disconnectRos={this.disconnectRos}
        />
        <Simulator
          compositionDetails={compositionDetails}
        />
      </div>
    );
  }
}

export default Wrapper;
