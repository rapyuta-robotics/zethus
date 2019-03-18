import React from 'react';
import Amphion from 'amphion';

class Pose extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };

    // const { scene, ros } = this.props;

    // this.amphionInstance = new Amphion.Pose(ros, '/random_pose');
    // console.log(this.amphionInstance);
    // scene.add(this.amphionInstance.object);
    // this.amphionInstance.subscribe();
  }

  hide() {
  }

  remove() {
  }

  render() {
    return (
      <h4>DIPLAY TF</h4>
    );
  }
}

export default function getInstane(scene, key, ros) {
  return React.createElement(Pose, { scene, key, ros });
}
