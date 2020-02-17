import React from 'react';
import _ from 'lodash';
import { vizOptions } from '../../utils/vizOptions';
import { ButtonPrimary, FlexGrow } from '../../components/styled';
import {
  AddVizForm,
  ModalActions,
  TopicRow,
  TypeContainer,
  TypeSelection,
  TypeUnsupported,
} from '../../components/styled/modal';

class TopicName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedViz: '',
    };
    this.selectViz = this.selectViz.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  selectViz(vizType, topicName, messageType, rosbagFileName) {
    this.setState({
      selectedViz: {
        vizType,
        topicName,
        messageType,
        rosbagFileName,
      },
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { selectViz } = this.props;
    const {
      selectedViz: { messageType, rosbagFileName, topicName, vizType },
    } = this.state;
    selectViz(vizType, topicName, messageType, rosbagFileName);
  }

  render() {
    const { closeModal, rosTopics } = this.props;
    const { selectedViz } = this.state;
    return (
      <AddVizForm onSubmit={this.onSubmit}>
        <TypeContainer>
          <TypeSelection>
            {_.map(
              _.sortBy(rosTopics, 'name'),
              ({ name, messageType, rosbagFileName }) => {
                const vizOption = _.find(vizOptions, v =>
                  _.includes(v.messageTypes, messageType),
                );
                return vizOption ? (
                  <TopicRow
                    type="button"
                    selected={_.get(selectedViz, 'topicName') === name}
                    key={`${name}-${rosbagFileName}`}
                    onClick={() =>
                      this.selectViz(
                        vizOption.type,
                        name,
                        messageType,
                        rosbagFileName,
                      )
                    }
                  >
                    {name}
                    {rosbagFileName && ` (from rosbag - ${rosbagFileName})`}
                    <FlexGrow />({messageType})
                  </TopicRow>
                ) : (
                  <TypeUnsupported key={`${name}-${rosbagFileName}`}>
                    {name}
                    <FlexGrow />
                    (Unsupported type: {messageType})
                  </TypeUnsupported>
                );
              },
            )}
          </TypeSelection>
        </TypeContainer>
        <ModalActions>
          <FlexGrow />
          <ButtonPrimary type="submit" disabled={!selectedViz}>
            Proceed
          </ButtonPrimary>
          <ButtonPrimary type="button" onClick={closeModal}>
            Close
          </ButtonPrimary>
        </ModalActions>
      </AddVizForm>
    );
  }
}

export default TopicName;
