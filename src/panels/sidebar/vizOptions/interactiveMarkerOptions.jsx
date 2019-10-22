import React from 'react';
import _ from 'lodash';
import {
  MESSAGE_TYPE_INTERACTIVEMARKER_FEEDBACK,
  MESSAGE_TYPE_INTERACTIVEMARKER_UPDATE,
} from 'amphion/src/utils/constants';
import OptionRow from '../../../components/optionRow';
import { Select } from '../../../components/styled';

class InteractiveMarkerOptions extends React.PureComponent {
  constructor(props) {
    super(props);

    const {
      options: propsOptions,
      relatedTopics,
      updateVizOptions,
    } = this.props;

    const { key } = propsOptions;

    this.updateTopics = _.filter(
      relatedTopics,
      t => t.messageType === MESSAGE_TYPE_INTERACTIVEMARKER_UPDATE,
    );
    this.feedbackTopics = _.filter(
      relatedTopics,
      t => t.messageType === MESSAGE_TYPE_INTERACTIVEMARKER_FEEDBACK,
    );

    updateVizOptions(key, {
      updateTopicName: {
        name: this.updateTopics.length > 0 ? this.updateTopics[0].name : '',
        messageType: MESSAGE_TYPE_INTERACTIVEMARKER_UPDATE,
      },
      feedbackTopicName: {
        name: this.feedbackTopics.length > 0 ? this.feedbackTopics[0].name : '',
        messageType: MESSAGE_TYPE_INTERACTIVEMARKER_FEEDBACK,
      },
    });
  }

  render() {
    const { options: propsOptions, updateVizOptions } = this.props;

    const { feedbackTopicName, key, updateTopicName } = propsOptions;

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
            {_.map(this.updateTopics, topic => (
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
            {_.map(this.feedbackTopics, topic => (
              <option key={topic.name}>{topic.name}</option>
            ))}
          </Select>
        </OptionRow>
      </React.Fragment>
    );
  }
}

export default InteractiveMarkerOptions;
