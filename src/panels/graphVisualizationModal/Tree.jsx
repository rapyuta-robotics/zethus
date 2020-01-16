import React, { Component } from 'react';
import createAndPopulateGraph, { reposition } from './utils';
import { defaultGraph, graphWithTopicNodes } from '../../utils';
import { NODE_SELECT_VALUES } from './constants';

class Tree extends Component {
  constructor(props) {
    super(props);
    this.graphBasedOnOptions = this.graphBasedOnOptions.bind(this);
    this.handleGraphResize = this.handleGraphResize.bind(this);
  }

  componentDidMount() {
    this.graphBasedOnOptions();
    window.addEventListener('resize', this.handleGraphResize);
  }

  handleGraphResize() {
    reposition(this.graph);
  }

  graphBasedOnOptions() {
    const { graph, nodeSelect } = this.props;
    let newGraph = null;
    switch (nodeSelect.value) {
      case NODE_SELECT_VALUES.NODES_ONLY: {
        newGraph = defaultGraph(graph);
        break;
      }
      case NODE_SELECT_VALUES.NODES_AND_TOPICS: {
        newGraph = graphWithTopicNodes(graph);
        break;
      }
    }
    this.graph = createAndPopulateGraph(newGraph, 'graph');
  }

  componentDidUpdate(prevProps) {
    const { graph, nodeSelect } = this.props;
    if (
      JSON.stringify(prevProps.graph) !== JSON.stringify(graph) ||
      JSON.stringify(prevProps.nodeSelect) !== JSON.stringify(nodeSelect)
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
