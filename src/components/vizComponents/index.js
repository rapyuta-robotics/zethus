import React from 'react';
import Pose from './Pose';
import DisplayOdometry from './DisplayOdometry';

export default props => {
  return {
    Pose: <Pose {...props} />,
    'Display Odometry': <DisplayOdometry {...props} />,
  };
};
