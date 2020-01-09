import React, { Component } from 'react';
import createAndPopulateGraph from './utils';
import './styles.css';

class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graph: props.graph,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (JSON.stringify(nextProps.graph) !== JSON.stringify(prevState.graph)) {
      createAndPopulateGraph(nextProps.graph, 'graph');
      return {
        graph: nextProps.graph,
      };
    }
    return null;
  }

  componentDidMount() {
    const { graph } = this.props;
    createAndPopulateGraph(graph, 'graph');
  }

  render() {
    return (
      <svg id="graph">
        <g />
      </svg>
    );
  }
}

export default Tree;
