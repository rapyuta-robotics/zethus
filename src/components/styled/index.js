import styled, { css, keyframes } from 'styled-components';
import {
  COLOR_BLUE,
  COLOR_GREY_LIGHT_1,
  COLOR_GREY_LIGHT_2,
  COLOR_GREY_TEXT_2,
  COLOR_GREY_TEXT_3,
  COLOR_PRIMARY,
  COLOR_RED,
  FONT_SIZE_S,
} from './constants';
import { ROS_SOCKET_STATUSES } from '../../utils';

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
  height: 100vh;
  overflow-y: hidden;
  width: 100%;
`;

export const PanelContent = styled.div`
  width: 0;
  flex-grow: 1;
  flex-shrink: 1;
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
