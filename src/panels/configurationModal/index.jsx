import React from 'react';
import styled from 'styled-components';
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import ace from 'brace';
import 'brace/mode/json';
import 'brace/theme/xcode';

import {
  ButtonPrimary,
  ButtonOutline,
  FlexGrow,
} from '../../components/styled';

import {
  ModalActions,
  ModalWrapper,
  ModalContents,
  ModalTitle,
} from '../../components/styled/modal';
import { COLOR_GREY_LIGHT_1 } from '../../components/styled/constants';
import { stopPropagation } from '../../utils';

const StyledEditor = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  background-color: ${COLOR_GREY_LIGHT_1};
  .jsoneditor {
    border: 0;
    border-radius: 4px;
  }
  .ace_content {
    background-color: ${COLOR_GREY_LIGHT_1};
  }
  .ace_editor {
    font-family: 'Source Code Pro', sans-serif;
  }
  .jsoneditor-text {
    background-color: ${COLOR_GREY_LIGHT_1};
  }
`;

const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 1;
  position: relative;
`;

const DragHoverText = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 1010;
  display: flex;
  align-items: center;
  justify-content: center;
  > p {
    text-align: center;
  }
`;

const overrideEventDefaults = event => {
  event.preventDefault();
  event.stopPropagation();
};

class ConfigurationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      config: props.configuration,
    };
    this.dragEventCounter = 0;

    this.downloadConfig = this.downloadConfig.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dragenterListener = this.dragenterListener.bind(this);
    this.dragleaveListener = this.dragleaveListener.bind(this);
    this.dropListener = this.dropListener.bind(this);
  }

  dragenterListener(event) {
    overrideEventDefaults(event);
    this.dragEventCounter++;
    if (event.dataTransfer.items && event.dataTransfer.items[0]) {
      this.setState({ dragging: true });
    }
  }

  dragleaveListener(event) {
    overrideEventDefaults(event);
    this.dragEventCounter--;

    if (this.dragEventCounter === 0) {
      this.setState({ dragging: false });
    }
  }

  dropListener(event) {
    overrideEventDefaults(event);
    this.dragEventCounter = 0;
    this.setState({ dragging: false });

    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const f = event.dataTransfer.files[0];
      const reader = new FileReader();

      reader.onload = e => {
        try {
          const config = JSON.parse(e.target.result);
          this.handleChange(config);
        } catch (error) {
          // TODO: Add notifications. Show notification for invalid json
          console.log(error);
        }
      };
      reader.readAsText(f);
    }
  }

  componentDidMount() {
    window.addEventListener('dragover', event => {
      overrideEventDefaults(event);
    });
    window.addEventListener('drop', event => {
      overrideEventDefaults(event);
    });
  }

  componentWillUnmount() {
    window.removeEventListener('dragover', overrideEventDefaults);
    window.removeEventListener('drop', overrideEventDefaults);
  }

  downloadConfig() {
    const { config } = this.state;
    const element = document.createElement('a');
    element.setAttribute(
      'href',
      `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(config, null, 2),
      )}`,
    );
    element.setAttribute('download', 'zethus_config.json');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
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
    const { config, dragging } = this.state;

    return (
      <ModalWrapper onClick={closeModal}>
        <ModalContents onClick={stopPropagation}>
          <ModalTitle>Edit Configuration</ModalTitle>
          <EditorWrapper
            onDrag={overrideEventDefaults}
            onDragStart={overrideEventDefaults}
            onDragEnd={overrideEventDefaults}
            onDragOver={overrideEventDefaults}
            onDragEnter={this.dragenterListener}
            onDragLeave={this.dragleaveListener}
            onDrop={this.dropListener}
          >
            <Editor
              ace={ace}
              mode="code"
              value={config}
              onChange={this.handleChange}
              tag={StyledEditor}
              theme="ace/theme/xcode"
              mainMenuBar={false}
              statusBar={false}
            />
            {dragging && (
              <DragHoverText>
                <p>Drag & drop Configuration JSON file</p>
              </DragHoverText>
            )}
          </EditorWrapper>
          <ModalActions>
            <ButtonOutline onClick={this.downloadConfig}>
              Download
            </ButtonOutline>
            <FlexGrow />
            <ButtonPrimary onClick={this.handleSubmit}>
              Update Configuration
            </ButtonPrimary>
            <ButtonOutline onClick={closeModal}>Cancel</ButtonOutline>
          </ModalActions>
        </ModalContents>
      </ModalWrapper>
    );
  }
}

export default ConfigurationModal;
