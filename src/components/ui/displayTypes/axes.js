import React from 'react';

class Axes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

  componentDidMount() {

  }

  hide() {
  }

  remove() {
  }

  render() {
    return (
      <h4>Axese</h4>
    );
  }
}

export default function getInstane(scene, key, ros) {
  return React.createElement(Axes, { scene, key, ros });
}
