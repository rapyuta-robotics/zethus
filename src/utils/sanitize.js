import { get, isNil, map, set, size } from 'lodash';

const replacementMap = {
  'sensor_msgs/Image': {
    key: 'data',
  },
  'visualization_msgs/MarkerArray': {
    key: 'markers',
    validation: it => size(it) <= 1000,
  },
  'nav_msgs/OccupancyGrid': {
    key: 'data',
  },
  'nav_msgs/Path': {
    key: 'poses',
    validation: it => size(it) <= 1000,
  },
  'sensor_msgs/PointCloud': {
    key: 'points',
  },
  'sensor_msgs/PointCloud2': {
    key: 'data',
  },
  'geometry_msgs/Polygon': {
    key: 'points',
  },
  'geometry_msgs/PolygonStamped': {
    key: 'polygon.points',
  },
  'geometry_msgs/PoseArray': {
    key: 'poses',
    validation: it => size(it) <= 1000,
  },
};

export const sanitizeMessage = (topic, message) => {
  // message is mutated for speed
  const { keys, messageType } = topic;
  const keysSet = new Set(keys);
  const filteredMessage = message;
  if (size(keys) !== 0) {
    map(filteredMessage, (value, key) => {
      if (!keysSet.has(key)) {
        delete filteredMessage[key];
      }
    });
  }
  if (isNil(replacementMap[messageType])) {
    return filteredMessage;
  }
  const { key, validation } = replacementMap[messageType];
  const value = get(filteredMessage, key);
  if (validation && value && validation(value)) {
    return filteredMessage;
  }
  // only set if already not filtered
  if (value) {
    set(message, key, '...');
  }
  return message;
};
