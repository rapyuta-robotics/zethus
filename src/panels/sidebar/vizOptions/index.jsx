import React, { useState } from 'react';
import _ from 'lodash';
import { CONSTANTS } from 'amphion';
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
import Chevron from '../../../components/chevron';
import {
  VIZ_TYPE_DEPTHCLOUD_STREAM,
  VIZ_TYPE_IMAGE_STREAM,
} from '../../../utils/vizOptions';

const {
  VIZ_TYPE_INTERACTIVEMARKER,
  VIZ_TYPE_ROBOTMODEL,
  VIZ_TYPE_TF,
} = CONSTANTS;

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
          <Chevron />
        </VizItemCollapse>
        <VizItemIcon>{icon}</VizItemIcon>
        {name}
      </StyledOptionRow>
      {!collapsed && (
        <VizItemContent>
          {!_.includes(
            [
              VIZ_TYPE_ROBOTMODEL,
              VIZ_TYPE_TF,
              VIZ_TYPE_DEPTHCLOUD_STREAM,
              VIZ_TYPE_IMAGE_STREAM,
            ],
            vizType,
          ) && (
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
