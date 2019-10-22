import { DEFAULT_OPTIONS_SCENE } from 'amphion/src/utils/constants';
import _ from 'lodash';
import { TF_MESSAGE_TYPES } from './vizOptions';

export const ROS_SOCKET_STATUSES = {
  INITIAL: 'Idle. Not Connected',
  CONNECTING: 'Connecting',
  CONNECTED: 'Connected successfully',
  CONNECTION_ERROR: 'Error in connection',
};

export const getTfTopics = rosTopics =>
  _.filter(rosTopics, t => _.includes(TF_MESSAGE_TYPES, t.messageType));

export const stopPropagation = e => e.stopPropagation();

export const DEFAULT_CONFIG = {
  panels: {
    sidebar: {
      display: true,
    },
  },
  ros: {
    endpoint: 'ws://localhost:9090',
  },
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
