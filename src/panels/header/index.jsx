import React from 'react';
import { StyledHeader, StyledLogo } from '../../components/styled';
import Logo from '../../components/logo';
import Toolbar from './toolbar';

export default class Header extends React.PureComponent {
  render() {
    const { activeTool, selectTool } = this.props;
    return (
      <StyledHeader>
        <StyledLogo>
          <Logo />
        </StyledLogo>
        <Toolbar activeTool={activeTool} selectTool={selectTool} />
      </StyledHeader>
    );
  }
}
