import styled, { css } from 'styled-components';
import { Button, Container, Flex } from './index';
import {
  COLOR_GREY_LIGHT_1,
  COLOR_GREY_LIGHT_2,
  COLOR_GREY_TEXT_4,
  COLOR_PRIMARY,
} from './constants';

export const VizImageClose = styled(Button)`
  cursor: pointer;
  background-color: transparent;
  border: 0;
  color: inherit;
  text-decoration: underline;
  font-size: inherit;
  font-family: inherit;
  &:hover {
    text-decoration: none;
  }
`;

export const SidebarVizContainer = styled(Container)`
  overflow-y: auto;
`;

export const VizItemContent = styled.div`
  margin-top: 8px;
  margin-left: 24px;
`;

export const VizItemIcon = styled.img`
  width: 20px;
  height: 20px;
  display: inline-block;
  background-color: ${COLOR_GREY_LIGHT_1};
  margin-right: 10px;
  border-radius: 4px;
`;

export const VizImageContainer = styled.div`
  display: flex;
  position: absolute;
  background-color: #fff;
  flex-direction: column;
  cursor: move;
  border-radius: 4px;
  border: 1px solid ${COLOR_GREY_LIGHT_2};

  canvas {
    width: 320px;
    height: 240px;
  }
`;

export const RosStatus = styled(Flex)`
  margin-bottom: 10px;
  align-items: center;
`;

export const VizImageHeader = styled.div`
  display: flex;
  font-size: 14px;
  padding: 2px 5px;
  border-bottom: 1px solid ${COLOR_GREY_LIGHT_2};
`;

export const VizImageName = styled.div`
  pointer-events: none;
  user-select: none;
`;

export const VizItem = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid ${COLOR_GREY_LIGHT_1};
`;

export const VizItemActions = styled.div`
  display: flex;
  margin-top: 8px;

  button {
    background: ${COLOR_GREY_LIGHT_1};
    border: 0;
    border-radius: 4px;
    color: ${COLOR_GREY_TEXT_4};
    padding: 5px 10px;
    font-size: 0.6rem;
    &:hover {
      background-color: ${COLOR_PRIMARY};
      color: #ffffff;
    }
    & + button {
      margin-left: 10px;
    }
  }
`;

export const VizItemCollapse = styled(Button)`
  background-color: transparent;
  border: 0;
  padding: 0;
  margin: 0 3px 0 0;
  width: 20px;
  height: 20px;
  img {
    width: 14px;
  }
  ${({ collapsed }) =>
    collapsed &&
    css`
      transform: rotate(-90deg);
    `}
`;
