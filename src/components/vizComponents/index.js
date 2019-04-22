import React from 'react';
import Pose from './Pose';

export default props => {
  return {
    Pose: <Pose {...props} />,
  };
};
