import React from 'react';
import styled from 'styled-components';
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import ace from 'brace';
import 'brace/mode/json';
import 'brace/theme/xcode';

import { ButtonPrimary, FlexGrow } from '../../components/styled';

import {
  ModalActions,
  ModalWrapper,
  ModalContents,
  ModalTitle,
} from '../../components/styled/modal';
import {
  COLOR_GREY_LIGHT_1,
  COLOR_GREY_LIGHT_2,
  COLOR_PRIMARY,
} from '../../components/styled/constants';
import { stopPropagation } from '../../utils';

const StyledEditor = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  background-color: ${COLOR_GREY_LIGHT_1};
  .jsoneditor-menu {
    background-color: ${COLOR_GREY_LIGHT_2};
    border-bottom: 0;
    border-radius: 4px 4px 0 0;
    & > button {
      color: ${COLOR_PRIMARY};
    }
  }
  .jsoneditor {
    border: 1px solid ${COLOR_GREY_LIGHT_2};
    border-radius: 4px;
  }
  .ace_editor {
    font-family: 'Source Code Pro', sans-serif;
  }
  .jsoneditor-text {
    background-color: ${COLOR_GREY_LIGHT_1};
  }
  .jsoneditor-statusbar {
    border-radius: 0 0 4px 4px;
  }
`;

class ConfigurationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      config: props.configuration,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(config) {
    this.setState({
      config,
    });
  }

  handleSubmit() {
    const { updateConfiguration } = this.props;
    const { config } = this.state;
    updateConfiguration(config);
  }

  render() {
    const { closeModal } = this.props;
    const { config } = this.state;

    return (
      <ModalWrapper onClick={closeModal}>
        <ModalContents onClick={stopPropagation}>
          <ModalTitle>Edit Configuration</ModalTitle>
          <Editor
            ace={ace}
            mode="code"
            value={config}
            onChange={this.handleChange}
            tag={StyledEditor}
            theme="ace/theme/xcode"
          />
          <ModalActions>
            <FlexGrow />
            <ButtonPrimary onClick={this.handleSubmit}>
              Update Configuration
            </ButtonPrimary>
            <ButtonPrimary onClick={closeModal}>
              Cancel
            </ButtonPrimary>
          </ModalActions>
        </ModalContents>
      </ModalWrapper>
    );
  }
}

export default ConfigurationModal;
