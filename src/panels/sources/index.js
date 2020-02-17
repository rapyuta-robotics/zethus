import Amphion from 'amphion';

const rosTopicDataSources = {};
const rosbagDataSources = {};
export const rosbagBucket = new Amphion.RosbagBucket();

export const getOrCreateRosTopicDataSource = options => {
  const { topicName } = options;
  const existingSource = rosTopicDataSources[topicName];
  if (existingSource) {
    return existingSource;
  }
  rosTopicDataSources[existingSource] = new Amphion.RosTopicDataSource(options);
  return rosTopicDataSources[existingSource];
};

export const getOrCreateRosbagDataSource = options => {
  const { topicName } = options;
  const existingSource = rosbagDataSources[topicName];
  if (existingSource) {
    return existingSource;
  }
  rosbagDataSources[existingSource] = new Amphion.RosbagDataSource(options);
  return rosbagDataSources[existingSource];
};
