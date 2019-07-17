import React from 'react';
import Pose from './pose';
import Odometry from './odometry';
import Marker from './marker';
import Map from './map';
import LaserScan from './laserScan';
import Path from './path';
import Image from './image';

class VizComp extends React.PureComponent {
  render() {
    const {
      props,
      props: { vizType },
    } = this;
    // console.log(vizType);
    switch (vizType.name) {
      case 'Pose':
        return <Pose {...props} />;
      case 'Odometry':
        return <Odometry {...props} />;
      case 'Marker':
        return <Marker {...props} />;
      case 'Marker Array':
        return <Marker {...props} />;
      case 'Pose Array':
        return <Pose {...props} />;
      case 'Map':
        return <Map {...props} />;
      case 'Laser Scan':
        return <LaserScan {...props} />;
      case 'Path':
        return <Path {...props} />;
      case 'Image':
        return <Image {...props} />;
      default:
        return null;
    }
  }
}

export default VizComp;
