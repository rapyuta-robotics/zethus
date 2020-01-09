import { CONSTANTS } from 'amphion';
import _ from 'lodash';
import { TF_MESSAGE_TYPES } from './vizOptions';

const { DEFAULT_OPTIONS_SCENE } = CONSTANTS;

export const ROS_SOCKET_STATUSES = {
  INITIAL: 'Idle. Not Connected',
  CONNECTING: 'Connecting',
  CONNECTED: 'Connected successfully',
  CONNECTION_ERROR: 'Error in connection',
};

export const getTfTopics = rosTopics =>
  _.filter(rosTopics, t => _.includes(TF_MESSAGE_TYPES, t.messageType));

export const stopPropagation = e => e.stopPropagation();

export const downloadFile = (content, filename, options = {}) => {
  const element = document.createElement('a');
  element.setAttribute(
    'href',
    `data:${options.mimetype || 'text/json'};charset=utf-8,${encodeURIComponent(
      content,
    )}`,
  );
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export const DEFAULT_CONFIG = {
  panels: {
    sidebar: {
      display: true,
    },
    header: {
      display: true,
    },
    info: {
      display: true,
      collapsed: true,
    },
  },
  ros: {
    endpoint: 'ws://localhost:9090',
  },
  infoTabs: [],
  visualizations: [],
  globalOptions: {
    display: true,
    backgroundColor: {
      display: true,
      value: DEFAULT_OPTIONS_SCENE.backgroundColor,
    },
    fixedFrame: {
      display: true,
      value: 'world',
    },
    grid: {
      display: true,
      size: DEFAULT_OPTIONS_SCENE.gridSize,
      divisions: DEFAULT_OPTIONS_SCENE.gridDivisions,
      color: DEFAULT_OPTIONS_SCENE.gridColor,
      centerlineColor: DEFAULT_OPTIONS_SCENE.gridCenterlineColor,
    },
  },
  tools: {
    mode: 'controls',
    controls: {
      display: false,
      enabled: true,
    },
    measure: {
      display: false,
    },
    custom: [],
  },
};

export function updateOptionsUtil(e) {
  const {
    options: { key },
    updateVizOptions,
  } = this.props;
  const {
    checked,
    dataset: { id: optionId },
    value,
  } = e.target;
  updateVizOptions(key, {
    [optionId]: _.has(e.target, 'checked') ? checked : value,
  });
}

export function promisifyGetNodeDetails(ros, node) {
  return new Promise(function(res, rej) {
    try {
      ros.getNodeDetails(node, function({ publishing, subscribing }) {
        res({ publishing, subscribing, node });
      });
    } catch (err) {
      rej(err);
    }
  });
}

/**
 *
 * @param {Array} topics - a list of topics
 * @param {Object} nodeDetails - List of node details with node name, publishing topics and subsribing topics
 * @returns {auxGraphData} - For creating graph later based on options.
 */
export function createAuxGraph(topics, nodeDetails) {
  const auxGraphData = {};

  topics.forEach(topic => {
    auxGraphData[topic] = { publishers: [], subscribers: [] };
  });
  nodeDetails.forEach(function({ publishing: pubs, subscribing: subs, node }) {
    pubs.forEach(topic => {
      auxGraphData[topic].publishers.push(node);
    });
    subs.forEach(topic => {
      auxGraphData[topic].subscribers.push(node);
    });
  });

  return auxGraphData;
}

export function defaultGraph(graph) {
  const edges = [];
  const { auxGraphData } = graph;
  _.each(_.keys(auxGraphData), t => {
    const { publishers } = auxGraphData[t];
    const { subscribers } = auxGraphData[t];

    _.each(publishers, pub => {
      _.each(subscribers, sub => {
        edges.push({
          source: { id: pub, label: pub },
          target: { id: sub, label: sub },
          value: t,
        });
      });
    });
  });
  return { nodes: graph.nodes, edges };
}

export function graphWithTopicNodes(graph) {
  const { nodes } = graph;
  const { auxGraphData } = graph;

  // Adding topic as nodes
  _.keys(graph.auxGraphData).forEach(topicName => {
    nodes.push({ id: topicName + topicName, label: topicName, type: 'rect' });
  });

  const edges = [];

  _.each(_.keys(auxGraphData), t => {
    const { publishers } = auxGraphData[t];
    const { subscribers } = auxGraphData[t];

    _.each(publishers, pub => {
      edges.push({
        source: { id: pub, label: pub },
        target: { id: t + t, label: t },
        value: '',
      });
    });

    _.each(subscribers, sub => {
      edges.push({
        source: { id: t + t, label: t },
        target: { id: sub, label: sub },
        value: '',
      });
    });
  });

  return { nodes, edges };
}

/**
 *
 * @param {*} ros - Ros reference
 * @returns {Promise} - graph object represents nodes and links as edges.
 */
export function generateGraph(ros) {
  const graph = {};

  return new Promise(function(res, rej) {
    ros.getNodes(nodes => {
      graph.nodes = _.map(nodes, node => ({
        id: node,
        label: node,
        type: 'ellipse',
      }));

      ros.getTopics(function({ topics }) {
        Promise.all(
          nodes.map(function(node) {
            return promisifyGetNodeDetails(ros, node);
          }),
        )
          .then(function(data) {
            graph.auxGraphData = createAuxGraph(topics, data);
            res(graph);
          })
          .catch(function(err) {
            rej(err);
          });
      });
    });
  });
}
