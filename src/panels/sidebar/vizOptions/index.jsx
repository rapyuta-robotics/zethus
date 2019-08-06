import React, { useState } from 'react';
import _ from 'lodash';
import classNames from 'classnames';

import { VIZ_TYPE_ROBOTMODEL, VIZ_TYPE_TF } from 'amphion/src/utils/constants';
import VizSpecificOptions from './vizSpecificOption';

const VizOptions = ({
  options: { vizType, name, topicName, key, visible, display },
  options,
  topics,
  vizObject: { icon },
  updateVizOptions,
  removeVisualization,
  toggleVisibility,
}) => {
  const [collapsed, toggleCollapsed] = useState(false);

  if (_.isBoolean(display) && !display) {
    return null;
  }
  return (
    <div className="vizItem">
      <div className="optionRow">
        <button
          className={classNames('vizItemCollapse', {
            collapsed,
          })}
          onClick={toggleCollapsed}
        >
          <img src="./image/chevron.svg" alt="" />
        </button>
        <img className="vizItemIcon" src={icon} alt="" />
        {name}
      </div>
      {!collapsed && (
        <div className="vizItemContent">
          {!_.includes([VIZ_TYPE_ROBOTMODEL, VIZ_TYPE_TF], vizType) && (
            <div className="optionRow">
              <div className="halfWidth">Topic:</div>
              <div className="halfWidth">
                <select
                  className="input"
                  value={topicName}
                  onChange={e =>
                    updateVizOptions(key, { topicName: e.target.value })
                  }
                >
                  {_.map(topics, topic => (
                    <option key={topic.name}>{topic.name}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
          <VizSpecificOptions
            options={options}
            updateVizOptions={updateVizOptions}
          />
          <div className="vizItemActions">
            <button data-id={key} onClick={removeVisualization}>
              Delete
            </button>
            <button data-id={key} onClick={toggleVisibility}>
              {_.isBoolean(visible) && !visible ? 'Show' : 'Hide'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VizOptions;
