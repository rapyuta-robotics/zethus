import React from 'react';
import _ from 'lodash';
import { SUPPORTED_MESSAGE_TYPES } from 'amphion/src/utils/constants';
import { vizOptions } from '../../utils';

const TopicName = ({
  addVisualizationByTopic,
  rosTopics: { topics, types },
  closeModal,
}) => {
  const supportedTopics = _.compact(
    _.map(topics, (t, index) => {
      if (_.includes(SUPPORTED_MESSAGE_TYPES, types[index])) {
        return {
          name: t,
          type: types[index],
        };
      }
      return null;
    }),
  );
  return (
    <div className="type-selection">
      {_.map(_.sortBy(supportedTopics, 'name'), ({ name, type }) => {
        const vizOption = _.find(vizOptions, v =>
          _.includes(v.messageTypes, type),
        );
        return (
          <button
            className="flex"
            key={name}
            onClick={() => {
              addVisualizationByTopic({
                name,
                type,
                isDisplay: false,
                displayName: vizOption.name,
                options: vizOption.defaultOptions,
              });
              closeModal();
            }}
          >
            {name}
            <span className="flexGrow" />({type})
          </button>
        );
      })}
    </div>
  );
};

export default TopicName;
