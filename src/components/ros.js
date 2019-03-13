import React from 'react';

export const ROS_SOCKET_STATUSES = {
  INITIAL: 0,
  CONNECTING: 1,
  CONNECTED: 2,
  CONNECTION_ERROR: 3,
};

class Ros extends React.PureComponent {
  render() {
    return (
      <p>Ros</p>
    );
  }
}

export default Ros;
