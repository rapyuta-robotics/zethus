import Amphion from 'amphion';

const rosTopicDataSources = {};

export const getOrCreateRosTopicDataSource = options => {
  const { topicName } = options;
  const existingSource = rosTopicDataSources[topicName];
  if (existingSource) {
    return existingSource;
  }
  rosTopicDataSources[existingSource] = new Amphion.RosTopicDataSource(options);
  return rosTopicDataSources[existingSource];
};
