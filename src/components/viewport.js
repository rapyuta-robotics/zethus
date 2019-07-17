import React from 'react';

import '../styles/viewport.scss';

class Viewport extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
  }

  componentDidMount() {
    const { viewer } = this.props;
    const container = this.container.current;
    viewer.setContainer(container);
    viewer.scene.stats.dom.id = 'viewportStats';
    container.appendChild(viewer.scene.stats.dom);
  }

  componentWillUnmount() {
    const { viewer } = this.props;
    viewer.destroy();
  }

  render() {
    return <div ref={this.container} className="Panel" id="viewport" />;
  }
}

export default Viewport;
