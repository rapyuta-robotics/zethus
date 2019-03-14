import React from 'react';
import { ROS_SOCKET_STATUSES } from './ros';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rosEndpoint: '',
    };
    this.onRosSubmit = this.onRosSubmit.bind(this);
    this.updateRosEndpoint = this.updateRosEndpoint.bind(this);
  }

  onRosSubmit(e) {
    e.preventDefault();
    const { rosEndpoint } = this.state;
    const { connectRos, disconnectRos, rosStatus } = this.props;

    if (rosStatus === ROS_SOCKET_STATUSES.CONNECTED) {
      this.props.disconnectRos();
    } else if (rosStatus === ROS_SOCKET_STATUSES.INITIAL
        || rosStatus === ROS_SOCKET_STATUSES.CONNECTION_ERROR) {
      this.props.connectRos(rosEndpoint);
    }
  }

  updateRosEndpoint(e) {
    this.setState({
      rosEndpoint: e.target.value,
    });
  }

  render() {
    const { rosStatus } = this.props;
    const { rosEndpoint } = this.state;
    return (
      <div id="header">
        <div id="logo">
          <img id="logomark" src="/logo.svg" alt="Zethus" />
        </div>
        <form id="ros-input-flex" onSubmit={this.onRosSubmit}>
          <input type="text" id="ros-input" value={rosEndpoint} onChange={this.updateRosEndpoint} />
          <button
            id="ros-connect"
            type="submit"
            disabled={rosStatus === ROS_SOCKET_STATUSES.CONNECTING}
          >
            {rosStatus === ROS_SOCKET_STATUSES.CONNECTED ? 'Disconnect' : 'Connect'}
          </button>
        </form>
        <i>
          Status :
          {rosStatus}
        </i>
      </div>
    );
  }
}

export default Header;
