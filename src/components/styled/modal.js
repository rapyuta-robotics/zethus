import styled from 'styled-components';
import { Button, Flex, Paragraph } from './index';
import {
  COLOR_GREY_LIGHT_1,
  COLOR_GREY_LIGHT_2,
  COLOR_GREY_TEXT_2,
  COLOR_PRIMARY,
} from './constants';

export const ModalWrapper = styled.div`
  position: absolute;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
`;

export const ModalContents = styled.div`
  width: 1000px;
  margin: 100px auto;
  height: 600px;
  background-color: #ffffff;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export const ModalTitle = styled.h2`
  margin-bottom: 6px;
  margin-top: 0;
`;

export const ModalActions = styled.div`
  display: flex;
  flex-shrink: 0;
  padding: 10px 0 0;

  button {
    margin-left: 10px;
  }
`;

export const TypeEmpty = styled(Paragraph)`
  padding-left: 30px;
  font-style: italic;
`;

export const TypeUnsupported = styled(Flex)`
  padding: 10px;
  opacity: 0.4;
  cursor: not-allowed;
`;

export const TypeContainer = styled.div`
  display: flex;
  flex-grow: 1;
  overflow: hidden;
`;

export const TypeSelection = styled.div`
  flex: 1 0 50%;
  overflow-y: auto;
`;

export const TypeInfo = styled.div`
  border-left: 1px solid ${COLOR_GREY_LIGHT_2};
  padding: 0 0 0 20px;
  flex: 1 0 50%;
  overflow-y: auto;

  h4 {
    margin-top: 10px;
    margin-bottom: 8px;
    font-size: 22px;
  }

  img {
    max-width: 100%;
  }

  & > div {
    margin-bottom: 8px;
  }
`;

export const TypeHeading = styled.h4`
  display: flex;
  align-items: center;
  text-transform: uppercase;
  margin-bottom: 5px;
`;

export const AddVizForm = styled.form`
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
  height: 0;
  flex-direction: column;
`;

export const TopicRow = styled(Button)`
  text-align: left;
  width: 100%;
  font-size: 16px;
  border: 0;
  background: transparent;
  padding: 10px;
  display: flex;
  align-items: center;

  .reactSelect {
    color: ${COLOR_GREY_TEXT_2};
  }

  &:hover {
    color: ${COLOR_PRIMARY};
    background-color: ${COLOR_GREY_LIGHT_1};
    .reactSelect {
      color: ${COLOR_GREY_TEXT_2};
    }
  }

  ${({ selected }) =>
    selected &&
    `
    color: ${COLOR_PRIMARY};
    background-color: ${COLOR_GREY_LIGHT_1};
  `}
`;

export const TypeRow = styled(TopicRow)`
  padding-left: 30px;
`;
