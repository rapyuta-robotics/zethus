import React from 'react';
import { filter, get, isNil, map, size } from 'lodash';
import TagsInput from 'react-tagsinput';
import {
  AddInfoPanelModalTopics,
  ButtonPrimary,
  FlexGrow,
} from '../../components/styled';

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
      keys: [],
    };

    this.selectTopic = this.selectTopic.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addInfoPanel = this.addInfoPanel.bind(this);
    this.handleFilterKeysChange = this.handleFilterKeysChange.bind(this);
  }

  handleFilterKeysChange(keys) {
    this.setState({ keys });
  }

  selectTopic(selected) {
    this.setState({ selected });
  }

  closeModal() {
    const { closeModal } = this.props;
    this.setState({ selected: null, keys: [] }, () => {
      closeModal();
    });
  }

  addInfoPanel(topic, keys) {
    const { closeModal, onAdd } = this.props;
    this.setState({ selected: null, keys: [] }, () => {
      onAdd(topic, keys);
      closeModal();
    });
  }

  render() {
    const { allTopics, open, topics } = this.props;
    const { keys, selected } = this.state;

    const topicsNamesSet = new Set(map(topics, topic => topic.name));
    const filteredTopics = filter(
      allTopics,
      topic => !topicsNamesSet.has(topic.name),
    );

    return open ? (
      <ModalWrapper onClick={this.closeModal}>
        <ModalContents onClick={stopPropagation}>
          <ModalTitle>Add Info Panel</ModalTitle>
          <AddInfoPanelModalTopics>
            {size(allTopics) === 0
              ? 'No topics available'
              : map(filteredTopics, ({ name, messageType, rosbagFileName }) => (
                  <TopicRow
                    type="button"
                    selected={get(selected, 'name') === name}
                    key={`${name}-${rosbagFileName}`}
                    onClick={() => {
                      this.selectTopic({ name, messageType });
                    }}
                  >
                    {name}
                    {rosbagFileName && ` (from rosbag - ${rosbagFileName})`}
                    <FlexGrow />({messageType})
                  </TopicRow>
                ))}
          </AddInfoPanelModalTopics>
          <ModalActions>
            <TagsInput
              value={keys}
              onlyUnique
              inputProps={{
                placeholder: 'Filter keys...',
              }}
              onChange={this.handleFilterKeysChange}
            />
          </ModalActions>
          <ModalActions>
            <FlexGrow />
            <ButtonPrimary
              disabled={isNil(selected)}
              onClick={() => this.addInfoPanel(selected, keys)}
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
