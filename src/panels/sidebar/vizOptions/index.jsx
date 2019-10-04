import React, { useState } from 'react';
import _ from 'lodash';

import {
  VIZ_TYPE_INTERACTIVEMARKER,
  VIZ_TYPE_ROBOTMODEL,
  VIZ_TYPE_TF,
} from 'amphion/src/utils/constants';
import VizSpecificOptions from './vizSpecificOption';
import { Button, Select, StyledOptionRow } from '../../../components/styled';
import OptionRow from '../../../components/optionRow';
import {
  VizItem,
  VizItemActions,
  VizItemCollapse,
  VizItemContent,
  VizItemIcon,
} from '../../../components/styled/viz';

const VizOptions = ({
  options: { display, key, name, topicName, visible, vizType },
  options,
  topics,
  relatedTopics,
  vizObject: { icon },
  updateVizOptions,
  removeVisualization,
  toggleVisibility,
}) => {
  const [collapsed, toggleCollapsed] = useState(false);

  if (_.isBoolean(display) && !display) {
    return null;
  }

  const updateVizOptionsWrapper = e => {
    if (vizType === VIZ_TYPE_INTERACTIVEMARKER) {
      updateVizOptions(key, {
        topicName: e.target.value,
        updateTopicName: undefined,
        feedbackTopicName: undefined,
      });
      return;
    }
    updateVizOptions(key, { topicName: e.target.value });
  };

  return (
    <VizItem>
      <StyledOptionRow>
        <VizItemCollapse
          collapsed={collapsed}
          onClick={() => toggleCollapsed(!collapsed)}
        >
          <img src="./image/chevron.svg" alt="" />
        </VizItemCollapse>
        <VizItemIcon src={icon} alt="" />
        {name}
      </StyledOptionRow>
      {!collapsed && (
        <VizItemContent>
          {!_.includes([VIZ_TYPE_ROBOTMODEL, VIZ_TYPE_TF], vizType) && (
            <OptionRow label="Topic">
              <Select value={topicName} onChange={updateVizOptionsWrapper}>
                {_.map(topics, topic => (
                  <option key={topic.name}>{topic.name}</option>
                ))}
              </Select>
            </OptionRow>
          )}
          <VizSpecificOptions
            options={options}
            topics={topics}
            relatedTopics={relatedTopics}
            updateVizOptions={updateVizOptions}
          />
          <VizItemActions>
            <Button data-id={key} onClick={removeVisualization}>
              Delete
            </Button>
            <Button data-id={key} onClick={toggleVisibility}>
              {_.isBoolean(visible) && !visible ? 'Show' : 'Hide'}
            </Button>
          </VizItemActions>
        </VizItemContent>
      )}
    </VizItem>
  );
};

export default VizOptions;
