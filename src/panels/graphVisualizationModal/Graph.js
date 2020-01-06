import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Graph } from 'react-d3-graph';

import config from './config';

const Wrapper = styled(Graph)`
  width: 100%;
  height: 100%;
`;

class GraphWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
    };
  }

  render() {
    const { graph } = this.props;
    const { hidden } = this.state;

    return <Wrapper id="graph" data={graph} config={config} hidden={hidden} />;
  }
}

GraphWrapper.propTypes = {
  graph: PropTypes.shape({
    nodes: PropTypes.array,
    links: PropTypes.array,
  }).isRequired,
};

export default GraphWrapper;
