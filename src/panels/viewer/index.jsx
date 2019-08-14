import React from 'react';
import styled from 'styled-components';

const StyledViewport = styled.div`
  width: 100%;
  flex-grow: 1;
  height: 100%;
  position: relative;

  #viewportStats {
    position: absolute !important;
    top: auto !important;
    left: auto !important;
    right: 0 !important;
    bottom: 0 !important;
  }
`;

class Viewport extends React.PureComponent {
  constructor(props) {
    super(props);
    this.container = React.createRef();

    this.updateViewerOptions = this.updateViewerOptions.bind(this);
  }

  componentDidUpdate(prevProps) {
    this.updateViewerOptions();
  }

  updateViewerOptions() {
    const {
      globalOptions: {
        backgroundColor: { value: backgroundColor },
        fixedFrame: { value: selectedFrame },
        grid: {
          centerlineColor: gridCenterlineColor,
          color: gridColor,
          divisions: gridDivisions,
          size: gridSize,
        },
      },
      viewer,
    } = this.props;
    viewer.updateOptions({
      backgroundColor,
      gridSize,
      gridDivisions,
      gridColor,
      gridCenterlineColor,
      selectedFrame,
    });
  }

  componentDidMount() {
    const { viewer } = this.props;
    const container = this.container.current;
    viewer.setContainer(container);
    this.updateViewerOptions();
    viewer.scene.stats.dom.id = 'viewportStats';
    container.appendChild(viewer.scene.stats.dom);
  }

  componentWillUnmount() {
    const { viewer } = this.props;
    viewer.destroy();
  }

  render() {
    return <StyledViewport ref={this.container} />;
  }
}

export default Viewport;
