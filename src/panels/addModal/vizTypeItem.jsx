import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { VIZ_TYPE_ROBOTMODEL } from 'amphion/src/utils/constants';
import Select from 'react-select';

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
          <h4 className="typeHeading">
            <img className="vizItemIcon" src={vizDetails.icon} alt="" />
            {vizDetails.type}
          </h4>
          <div
            type="button"
            className={classNames({
              typeRow: true,
              selected: isRobotmodel,
            })}
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
          </div>
        </div>
      );
    }
    return (
      <div>
        <h4 className="typeHeading">
          <img className="vizItemIcon" src={vizDetails.icon} alt="" />
          {vizDetails.type}
        </h4>
        {_.map(topics, topic => (
          <button
            type="button"
            key={topic.name}
            className={classNames({
              typeRow: true,
              selected: _.get(selectedViz, 'topicName') === topic.name,
            })}
            onClick={() =>
              selectViz(vizDetails.type, topic.name, topic.messageType)
            }
          >
            {topic.name}
          </button>
        ))}
        {_.size(topics) === 0 && (
          <p className="typeEmpty">
            No topics available for the visualization type
          </p>
        )}
      </div>
    );
  }
}

export default VizTypeItem;
