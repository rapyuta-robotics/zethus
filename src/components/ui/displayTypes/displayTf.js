import React from 'react';
import Amphion from 'amphion';

class DisplayTf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };

    const { scene, ros } = this.props;
    this.amphionInstance = new Amphion.Tf(ros, '/tf');
    scene.add(this.amphionInstance.object);
    this.amphionInstance.subscribe();
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
  return React.createElement(DisplayTf, { scene, key, ros });
}
