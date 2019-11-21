import React from 'react';
import { filter, get, isNil, map, size } from 'lodash';
import { ButtonPrimary, FlexGrow } from '../../components/styled';

import {
  ModalActions,
  ModalContents,
  ModalTitle,
  ModalWrapper,
  TopicRow,
} from '../../components/styled/modal';
import { stopPropagation } from '../../utils';

class AddInfoPanelModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };

    this.selectTopic = this.selectTopic.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addInfoPanel = this.addInfoPanel.bind(this);
  }

  selectTopic(selected) {
    this.setState({ selected });
  }

  closeModal() {
    const { closeModal } = this.props;
    this.setState({ selected: null }, () => {
      closeModal();
    });
  }

  addInfoPanel(params) {
    const { closeModal, onAdd } = this.props;
    this.setState({ selected: null }, () => {
      onAdd(params);
      closeModal();
    });
  }

  render() {
    const { open, rosTopics, topics } = this.props;
    const { selected } = this.state;

    const topicsNamesSet = new Set(map(topics, topic => topic.name));
    const filteredTopics = filter(
      rosTopics,
      topic => !topicsNamesSet.has(topic.name),
    );

    return open ? (
      <ModalWrapper onClick={this.closeModal}>
        <ModalContents onClick={stopPropagation}>
          <ModalTitle>Add Info Panel</ModalTitle>
          {size(rosTopics) === 0
            ? 'No topics available'
            : map(filteredTopics, ({ name, messageType }) => (
                <TopicRow
                  type="button"
                  selected={get(selected, 'name') === name}
                  key={name}
                  onClick={() => {
                    this.selectTopic({ name, messageType });
                  }}
                >
                  {name}
                  <FlexGrow />({messageType})
                </TopicRow>
              ))}
          <ModalActions>
            <FlexGrow />
            <ButtonPrimary
              disabled={isNil(selected)}
              onClick={() => this.addInfoPanel(selected)}
            >
              Confirm
            </ButtonPrimary>
            <ButtonPrimary onClick={this.closeModal}>Cancel</ButtonPrimary>
          </ModalActions>
        </ModalContents>
      </ModalWrapper>
    ) : null;
  }
}

export default AddInfoPanelModal;
