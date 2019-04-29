import React from 'react';
import Pose from './Pose';
import DisplayOdometry from './DisplayOdometry';
import Marker from './Marker';
import Map from './Map';

export default props => {
  return {
    Pose: <Pose {...props} />,
    'Display Odometry': <DisplayOdometry {...props} />,
    Markers: <Marker {...props} />,
    'Marker Array': <Marker {...props} />,
    'Pose Array': <Pose {...props} />,
    Map: <Map {...props} />,
  };
};
