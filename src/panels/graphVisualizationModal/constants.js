export const NODE_SELECT_VALUES = {
  NODES_ONLY: 0,
  NODES_AND_TOPICS: 1,
};

export const NODE_OPTIONS = [
  {
    value: NODE_SELECT_VALUES.NODES_ONLY,
    label: 'Nodes only',
  },
  {
    value: NODE_SELECT_VALUES.NODES_AND_TOPICS,
    label: 'Node/Topics (all)',
  },
];
