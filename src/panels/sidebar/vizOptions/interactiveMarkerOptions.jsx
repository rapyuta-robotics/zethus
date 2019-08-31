import React from 'react';
import _ from 'lodash';
import OptionRow from '../../../components/optionRow';
import { Select } from '../../../components/styled';

class InteractiveMarkerOptions extends React.PureComponent {
  render() {
    const { options: propsOptions, topics, updateVizOptions } = this.props;

    const { feedbackTopicName, key, updateTopicName } = propsOptions;

    return (
      <React.Fragment>
        <OptionRow label="Update Topic">
          <Select
            value={updateTopicName || ''}
            onChange={e =>
              updateVizOptions(key, { updateTopicName: e.target.value })
            }
          >
            <option value="" disabled hidden>
              Select
            </option>
            {_.map(topics, topic => (
              <option key={topic.name}>{topic.name}</option>
            ))}
          </Select>
        </OptionRow>
        <OptionRow label="Feedback Topic">
          <Select
            value={feedbackTopicName || ''}
            onChange={e =>
              updateVizOptions(key, { feedbackTopicName: e.target.value })
            }
          >
            <option value="" disabled hidden>
              Select
            </option>
            {_.map(topics, topic => (
              <option key={topic.name}>{topic.name}</option>
            ))}
          </Select>
        </OptionRow>
      </React.Fragment>
    );
  }
}

export default InteractiveMarkerOptions;
