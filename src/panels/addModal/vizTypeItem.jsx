import React from 'react';
import _ from 'lodash';
import isValidUrl from 'is-valid-http-url';
import { CONSTANTS } from 'amphion';
import Select from 'react-select';
import { TypeEmpty, TypeHeading, TypeRow } from '../../components/styled/modal';
import { VizItemIcon } from '../../components/styled/viz';
import {
  VIZ_TYPE_DEPTHCLOUD_STREAM,
  VIZ_TYPE_IMAGE_STREAM,
} from '../../utils/vizOptions';
import { Input } from '../../components/styled';

const { VIZ_TYPE_ROBOTMODEL } = CONSTANTS;

const customStyles = {
  container: provided => ({
    ...provided,
    fontSize: '16px',
    width: '250px',
  }),
  control: provided => ({
    ...provided,
    border: '1px solid #dddddd',
  }),
};

class VizTypeItem extends React.PureComponent {
  render() {
    const {
      rosParams,
      selectedViz,
      selectViz,
      topics,
      vizDetails,
    } = this.props;
    const topicName = _.get(selectedViz, 'topicName');
    const isRobotmodel = _.get(selectedViz, 'vizType') === VIZ_TYPE_ROBOTMODEL;
    const isAdditionalTypeSelected = {
      [VIZ_TYPE_ROBOTMODEL]:
        _.get(selectedViz, 'vizType') === VIZ_TYPE_ROBOTMODEL,
      [VIZ_TYPE_DEPTHCLOUD_STREAM]:
        _.get(selectedViz, 'vizType') === VIZ_TYPE_DEPTHCLOUD_STREAM,
      [VIZ_TYPE_IMAGE_STREAM]:
        _.get(selectedViz, 'vizType') === VIZ_TYPE_IMAGE_STREAM,
    };
    if (vizDetails.type === VIZ_TYPE_ROBOTMODEL) {
      return (
        <div>
          <TypeHeading>
            <VizItemIcon alt="">{vizDetails.icon}</VizItemIcon>
            {vizDetails.type}
          </TypeHeading>
          <TypeRow
            type="button"
            selected={isAdditionalTypeSelected[VIZ_TYPE_ROBOTMODEL]}
          >
            <Select
              isSearchable
              className="reactSelect"
              styles={customStyles}
              value={
                topicName && isRobotmodel
                  ? { label: topicName, value: topicName }
                  : ''
              }
              options={_.map(rosParams, p => ({ label: p, value: p }))}
              onChange={({ value }) => {
                selectViz(vizDetails.type, value, '');
              }}
            />
          </TypeRow>
        </div>
      );
    }
    if (
      vizDetails.type === VIZ_TYPE_DEPTHCLOUD_STREAM ||
      vizDetails.type === VIZ_TYPE_IMAGE_STREAM
    ) {
      return (
        <div>
          <TypeHeading>
            <VizItemIcon alt="">{vizDetails.icon}</VizItemIcon>
            {vizDetails.type}
          </TypeHeading>
          <TypeRow
            type="button"
            selected={isAdditionalTypeSelected[vizDetails.type]}
          >
            <Input
              type="text"
              placeholder="Stream URL"
              onChange={e => {
                if (!isValidUrl(e.target.value)) {
                  return;
                }
                selectViz(vizDetails.type, e.target.value, '');
              }}
            />
          </TypeRow>
        </div>
      );
    }
    return (
      <div>
        <TypeHeading>
          <VizItemIcon alt="">{vizDetails.icon}</VizItemIcon>
          {vizDetails.type}
        </TypeHeading>
        {_.map(topics, topic => (
          <TypeRow
            type="button"
            key={topic.name}
            selected={_.get(selectedViz, 'topicName') === topic.name}
            onClick={() =>
              selectViz(vizDetails.type, topic.name, topic.messageType)
            }
          >
            {topic.name}
          </TypeRow>
        ))}
        {_.size(topics) === 0 && (
          <TypeEmpty>No topics available for the visualization type</TypeEmpty>
        )}
      </div>
    );
  }
}

export default VizTypeItem;
