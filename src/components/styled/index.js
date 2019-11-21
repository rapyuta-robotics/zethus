import styled, { createGlobalStyle, css, keyframes } from 'styled-components';
import {
  COLOR_BLUE,
  COLOR_GREY_LIGHT_1,
  COLOR_GREY_LIGHT_2,
  COLOR_GREY_TEXT_1,
  COLOR_GREY_TEXT_2,
  COLOR_GREY_TEXT_3,
  COLOR_PRIMARY,
  COLOR_RED,
  FONT_SIZE_DEFAULT,
  FONT_SIZE_S,
  HEADER_HEIGHT_PX,
} from './constants';
import { ROS_SOCKET_STATUSES } from '../../utils';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  html {
    font-size: 20px;
  }
  
  body {
    padding: 0;
    margin: 0;
    color: ${COLOR_GREY_TEXT_1};
    font-family: 'Source Sans Pro', sans-serif;
    overflow: hidden;
    line-height: 1.5;
    font-size: ${FONT_SIZE_DEFAULT};
  }
  
  html, body, #root {
    width: 100%;
    height: 100%;
  }
`;

export const Button = styled.button`
  cursor: pointer;
  font-size: inherit;
  font-family: inherit;
  outline: 0;

  &:active {
    outline: 0;
  }
`;

export const Paragraph = styled.p`
  line-height: 1.5;
`;

export const Anchor = styled.a`
  color: ${COLOR_PRIMARY};
`;

export const Separator = styled.hr`
  width: 100%;
  height: 0;
  border: 0;
  margin: 0;
  border-bottom: 1px solid ${COLOR_GREY_LIGHT_2};
`;

export const Flex = styled.div`
  display: flex;
`;

export const FlexSpace = styled.div`
  width: 10px;
`;

export const FlexGrow = styled.div`
  flex-grow: 1;
`;

export const PanelWrapper = styled.div`
  display: flex;
  background-color: #000;
  height: calc(100% - ${HEADER_HEIGHT_PX}px);
  overflow: hidden;
  width: 100%;
`;

export const PanelContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

export const Container = styled.div`
  padding: 15px 20px;
`;

export const TabsHeader = styled.div`
  display: flex;
  border-bottom: 1px solid ${COLOR_GREY_LIGHT_2};
  flex-shrink: 0;
`;

export const TabsButton = styled(Button)`
  margin: 0 10px -1px;
  background-color: transparent;
  border: 1px solid ${COLOR_GREY_LIGHT_2};
  border-bottom: 1px solid ${COLOR_GREY_LIGHT_2};
  border-radius: 4px 4px 0 0;
  color: inherit;
  padding: 5px 10px 10px;
  ${({ selected }) =>
    selected &&
    css`
      border: 1px solid ${COLOR_GREY_LIGHT_2};
      border-bottom: 1px solid #fff;
    `}
`;

export const ButtonPrimary = styled(Button)`
  border: 0;
  margin: 0;
  padding: 6px 20px;
  border-radius: 4px;
  color: white;
  background-color: ${COLOR_PRIMARY};
  font-size: 16px;
  &[disabled] {
    background-color: ${COLOR_GREY_LIGHT_2};
  }
`;

export const InputWrapper = styled.div`
  padding-top: 11px;
  padding-bottom: 11px;
`;

export const InputLabel = styled.label`
  font-size: 14px;
  color: ${COLOR_GREY_TEXT_3};
  display: block;
  margin: 0 0 5px;
`;

const inputStyles = `
  height: 32px;
  width: 100%;
  flex-grow: 1;
  flex-shrink: 1;
  background-color: ${COLOR_GREY_LIGHT_1};
  border: 1px solid ${COLOR_GREY_LIGHT_1};
  color: ${COLOR_GREY_TEXT_2};
  border-radius: 4px;
  padding: 0 8px;
  font-size: inherit;
  font-family: inherit;
  outline: 0;

  &:active {
    outline: 0;
  }
  :active,
  :focus {
    outline: 0;
    border: 1px solid ${COLOR_BLUE};
  }
  ${({ error }) =>
    error &&
    css`
      border: 1px solid ${COLOR_RED};
    `}
  [disabled] {
    cursor: not-allowed;
  }
`;
export const Input = styled.input`
  ${inputStyles}
`;

export const Select = styled.select`
  ${inputStyles}
`;

export const HalfWidth = styled.div`
  width: 50%;
`;

export const StyledOptionRow = styled.div`
  display: flex;
  min-height: 30px;
  align-items: center;
  padding: 3px 0;
  font-size: ${FONT_SIZE_S};

  ${Input}, ${Select} {
    height: 26px;
  }
`;

export const OptionContainer = styled.div`
  padding: 0 20px;
`;

const twinkle = keyframes`
  from, to {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }
`;

export const RosStatusIndicator = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  margin: 0 10px -2px 0;
  ${({ status }) => {
    switch (status) {
      case ROS_SOCKET_STATUSES.CONNECTED:
        return css`
          background-color: #3e991c;
        `;
      case ROS_SOCKET_STATUSES.CONNECTING:
        return css`
          background-color: #f9c351;
          animation: ${twinkle} normal 1s infinite ease-in-out;
        `;
      case ROS_SOCKET_STATUSES.CONNECTION_ERROR:
        return css`
          background-color: #ff3e3c;
        `;
      default:
        return css`
          background-color: #000000;
        `;
    }
  }}
`;

export const StyledSidebar = styled.div`
  background-color: #fff;
  width: 400px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;

export const StyledHeader = styled.div`
  padding: 10px 20px;
  display: flex;
  border-bottom: 1px solid #dddddd;
  justify-content: space-between;
`;

export const StyledLogo = styled.div`
  svg {
    height: 40px;
    display: block;
  }
`;

export const StyledToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  max-width: calc(100% - 400px);
  overflow-x: auto;
`;

export const StyledTool = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 5px;
  background: ${props => (props.active ? '#F6F6F6' : 'white')};
  color: ${props => (props.active ? '#dc1d30' : 'inherit')};
`;

export const ToolHeading = styled.span`
  padding: 2px;
`;

export const TextButton = styled(Button)`
  border: 0;
  margin: 0;
  padding: 0;
  background-color: transparent;
  color: ${COLOR_PRIMARY};
  font-size: 16px;
  text-decoration: underline;
  &:hover {
    text-decoration: none;
  }
  &[disabled] {
    color: ${COLOR_GREY_LIGHT_2};
  }
`;

export const ViewportWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const InfoPanel = styled.div`
  width: 100%;
  background: white;
  border-left: 1px solid ${COLOR_GREY_LIGHT_2};
`;

export const InfoPanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  overflow-x: auto;
  border-bottom: 1px solid ${COLOR_GREY_LIGHT_1};
`;

export const InfoPanelTabsWrapper = styled.div`
  display: flex;
  flex-grow: 8;
`;

export const InfoPanelHeaderControls = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;

  & > span {
    padding: 3px 5px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;

export const InfoPanelTab = styled.div`
  display: flex;
  padding: 5px 10px;
  max-width: 250px;
  border-right: 1px solid ${COLOR_GREY_LIGHT_1};
  cursor: pointer;
  color: ${props => (props.selected ? COLOR_RED : 'inherit')};
  user-select: none;

  & > span:first-child {
    display: block;
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 10px;
  }
`;

export const InfoPanelContentWrapper = styled.div`
  width: 100%;
  transition: height 0.2s ease-out;
  height: ${props => (props.collapsed ? 0 : 300)}px;
  overflow-y: auto;

  & .jsoneditor {
    border: none;
  }
  & .jsoneditor-menu {
    display: none;
  }
  & .jsoneditor-expandable:first-child {
    display: none;
  }
  & .jsoneditor-tree-inner {
    margin: 10px 10px 20px -20px;
  }
`;

export const InfoPanelNoMessage = styled.div`
  margin: 10px 25px;
`;

export const InfoPanelAddButton = styled.div`
  user-select: none;
  width: 30px;
  padding: 5px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: ${COLOR_GREY_LIGHT_1};
`;
