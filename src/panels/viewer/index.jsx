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
  }

  componentDidUpdate(prevProps) {
    const {
      viewer,
      globalOptions: {
        backgroundColor: { value: backgroundColor },
        grid: {
          size: gridSize,
          divisions: gridDivisions,
          color: gridColor,
          centerlineColor: gridCenterlineColor,
        },
        fixedFrame: { value: fixedFrame },
      },
    } = this.props;
    viewer.updateOptions({
      backgroundColor,
      gridSize,
      gridDivisions,
      gridColor,
      gridCenterlineColor,
    });
    if (fixedFrame !== prevProps.globalOptions.fixedFrame.value) {
      viewer.updateSelectedFrame(fixedFrame);
    }
  }

  componentDidMount() {
    const {
      viewer,
      globalOptions: {
        fixedFrame: { value: fixedFrame },
      },
    } = this.props;
    const container = this.container.current;
    viewer.setContainer(container);
    viewer.updateSelectedFrame(fixedFrame);
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
