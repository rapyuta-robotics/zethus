import React from 'react';

import { RosStatusIndicator } from './styled';

class ConnectionDot extends React.PureComponent {
  render() {
    const { status } = this.props;
    return <RosStatusIndicator status={status} />;
  }
}

export default ConnectionDot;
