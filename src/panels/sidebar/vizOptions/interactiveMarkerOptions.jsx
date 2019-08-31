import React from 'react';
import _ from 'lodash';
import {
  MESSAGE_TYPE_INTERACTIVEMARKER_FEEDBACK,
  MESSAGE_TYPE_INTERACTIVEMARKER_UPDATE,
} from 'amphion/src/utils/constants';
import OptionRow from '../../../components/optionRow';
import { Select } from '../../../components/styled';

class InteractiveMarkerOptions extends React.PureComponent {
  render() {
    const {
      additionalTopics,
      options: propsOptions,
      updateVizOptions,
    } = this.props;

    const { feedbackTopicName, key, updateTopicName } = propsOptions;

    const updateTopics = _.filter(
      additionalTopics,
      t => t.messageType === MESSAGE_TYPE_INTERACTIVEMARKER_UPDATE,
    );
    const feedbackTopics = _.filter(
      additionalTopics,
      t => t.messageType === MESSAGE_TYPE_INTERACTIVEMARKER_FEEDBACK,
    );

    return (
      <React.Fragment>
        <OptionRow label="Update Topic">
          <Select
            value={updateTopicName || ''}
            onChange={e =>
              updateVizOptions(key, {
                updateTopicName: {
                  name: e.target.value,
                  messageType: MESSAGE_TYPE_INTERACTIVEMARKER_UPDATE,
                },
              })
            }
          >
            <option value="" disabled hidden>
              Select
            </option>
            {_.map(updateTopics, topic => (
              <option key={topic.name}>{topic.name}</option>
            ))}
          </Select>
        </OptionRow>
        <OptionRow label="Feedback Topic">
          <Select
            value={feedbackTopicName || ''}
            onChange={e =>
              updateVizOptions(key, {
                feedbackTopicName: {
                  name: e.target.value,
                  messageType: MESSAGE_TYPE_INTERACTIVEMARKER_FEEDBACK,
                },
              })
            }
          >
            <option value="" disabled hidden>
              Select
            </option>
            {_.map(feedbackTopics, topic => (
              <option key={topic.name}>{topic.name}</option>
            ))}
          </Select>
        </OptionRow>
      </React.Fragment>
    );
  }
}

export default InteractiveMarkerOptions;
