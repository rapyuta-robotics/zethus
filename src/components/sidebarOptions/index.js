import React from 'react';
import Pose from './Pose';
import Odometry from './Odometry';
import Marker from './Marker';
import Map from './Map';
import LaserScan from './LaserScan';
import Path from './Path';
import Image from './Image';

export default props => {
  return {
    Pose: <Pose {...props} />,
    Odometry: <Odometry {...props} />,
    Markers: <Marker {...props} />,
    'Marker Array': <Marker {...props} />,
    'Pose Array': <Pose {...props} />,
    Map: <Map {...props} />,
    'Laser Scan': <LaserScan {...props} />,
    Path: <Path {...props} />,
    Image: <Image {...props} />,
  };
};
