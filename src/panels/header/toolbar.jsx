import React from 'react';
import { map } from 'lodash';
import { StyledToolbar } from '../../components/styled';
import Tool from './tool';
import { toolOptions } from '../../utils/toolbar';

export default class Toolbar extends React.PureComponent {
  render() {
    const { activeTool, selectTool } = this.props;
    return (
      <StyledToolbar>
        {map(toolOptions, option => (
          <Tool
            key={option.type}
            data={option}
            selectTool={selectTool}
            active={option.type === activeTool}
          />
        ))}
      </StyledToolbar>
    );
  }
}
