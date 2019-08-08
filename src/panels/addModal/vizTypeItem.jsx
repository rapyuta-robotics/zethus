import React from 'react';
import _ from 'lodash';
import { VIZ_TYPE_ROBOTMODEL } from 'amphion/src/utils/constants';
import Select from 'react-select';
import { TypeEmpty, TypeHeading, TypeRow } from '../../components/styled/modal';
import { VizItemIcon } from '../../components/styled/viz';

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
      vizDetails,
      topics,
      rosParams,
      selectedViz,
      selectViz,
    } = this.props;
    const topicName = _.get(selectedViz, 'topicName');
    const isRobotmodel = _.get(selectedViz, 'vizType') === VIZ_TYPE_ROBOTMODEL;
    if (vizDetails.type === VIZ_TYPE_ROBOTMODEL) {
      return (
        <div>
          <TypeHeading>
            <VizItemIcon src={vizDetails.icon} alt="" />
            {vizDetails.type}
          </TypeHeading>
          <TypeRow type="button" selected={isRobotmodel}>
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
    return (
      <div>
        <TypeHeading>
          <VizItemIcon src={vizDetails.icon} alt="" />
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
