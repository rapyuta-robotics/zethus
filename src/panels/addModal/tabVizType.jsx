import React from 'react';
import _ from 'lodash';
import { vizOptions } from '../../utils/vizOptions';
import VizTypeItem from './vizTypeItem';
import VizTypeDetails from './vizTypeDetails';
import { ButtonPrimary, FlexGrow } from '../../components/styled';
import {
  AddVizForm,
  ModalActions,
  TypeContainer,
  TypeInfo,
  TypeSelection,
} from '../../components/styled/modal';

class VizType extends React.PureComponent {
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
    const { selectedViz } = this.state;
    const { closeModal, rosParams, rosTopics } = this.props;
    return (
      <AddVizForm onSubmit={this.onSubmit}>
        <TypeContainer>
          <TypeSelection>
            {_.map(vizOptions, op => {
              return (
                <VizTypeItem
                  selectViz={this.selectViz}
                  selectedViz={selectedViz}
                  rosParams={rosParams}
                  key={op.type}
                  vizDetails={op}
                  topics={_.filter(rosTopics, t =>
                    _.includes(op.messageTypes, t.messageType),
                  )}
                />
              );
            })}
          </TypeSelection>
          <TypeInfo>
            {selectedViz ? (
              <VizTypeDetails vizType={selectedViz.vizType} />
            ) : (
              <p>
                No visualization selected.
                <br />
                Please choose a visualization on the left to see details
              </p>
            )}
          </TypeInfo>
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

export default VizType;
