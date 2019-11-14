import React from 'react';
import { StyledTool, ToolHeading } from '../../components/styled';

export default class Tool extends React.PureComponent {
  render() {
    const { active, data, selectTool } = this.props;
    const { icon, name, type } = data;
    return (
      <StyledTool active={active} onClick={() => selectTool(name, type)}>
        {icon(active)} <ToolHeading>{name}</ToolHeading>
      </StyledTool>
    );
  }
}
