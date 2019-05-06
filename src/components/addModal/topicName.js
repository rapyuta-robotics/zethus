import React from 'react';
import _ from 'lodash';
// import { } from 'amphion';

const TopicName = ({ rosTopics: { topics, types } }) => (
  <div className="type-selection">
    {_.map(topics, (t, index) => {
      const messageType = types[index];
      return (
        <p key={t}>
          {t} {messageType}
        </p>
      );
    })}
  </div>
);

export default TopicName;
