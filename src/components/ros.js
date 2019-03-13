import React from 'react';

export const ROS_SOCKET_STATUSES = {
  INITIAL: 'Idle',
  CONNECTING: 'Connecting',
  CONNECTED: 'Connected successfully',
  CONNECTION_ERROR: 'Error in connection',
};

class Ros extends React.PureComponent {
  render() {
    return (
      <p>Ros</p>
    );
  }
}

export default Ros;
