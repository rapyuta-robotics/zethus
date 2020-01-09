import React, { Component } from 'react';
import createAndPopulateGraph from './utils';
import './styles.css';
import { defaultGraph, graphWithTopicNodes } from '../../utils';

class Tree extends Component {
  constructor(props) {
    super(props);
    this.graphBasedOnOptions = this.graphBasedOnOptions.bind(this);
  }

  componentDidMount() {
    this.graphBasedOnOptions();
  }

  graphBasedOnOptions() {
    const { debug, graph } = this.props;

    let newGraph = null;
    switch (debug) {
      case true: {
        newGraph = defaultGraph(graph);
        break;
      }
      case false: {
        newGraph = graphWithTopicNodes(graph);
        break;
      }
    }

    createAndPopulateGraph(newGraph, 'graph');
  }

  componentDidUpdate(prevProps) {
    const { debug, graph } = this.props;
    if (
      JSON.stringify(prevProps.graph) !== JSON.stringify(graph) ||
      prevProps.debug !== debug
    ) {
      this.graphBasedOnOptions();
    }
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
