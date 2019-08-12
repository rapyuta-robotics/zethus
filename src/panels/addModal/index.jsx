import React from 'react';
import _ from 'lodash';

import { TabsButton, TabsHeader } from '../../components/styled';
import {
  ModalWrapper,
  ModalContents,
  ModalTitle,
} from '../../components/styled/modal';
import TabVizType from './tabVizType';
import TabTopicName from './tabTopicName';
import SelectedVizOptionsForm from './options';

const stopPropagation = e => e.stopPropagation();

const tabs = {
  vizType: 'Visualization type',
  topicName: 'Topic name',
};

class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabType: tabs.vizType,
      selectedViz: '',
    };

    this.updateTab = this.updateTab.bind(this);
    this.selectViz = this.selectViz.bind(this);
  }

  updateTab(tabType) {
    this.setState({
      tabType,
    });
  }

  selectViz(vizType, topicName, messageType) {
    this.setState({
      selectedViz: vizType
        ? {
            vizType,
            topicName,
            messageType,
          }
        : '',
    });
  }

  render() {
    const {
      addVisualization,
      closeModal,
      ros,
      rosParams,
      rosTopics,
    } = this.props;
    const { selectedViz, tabType } = this.state;
    return (
      <ModalWrapper onClick={closeModal}>
        <ModalContents onClick={stopPropagation}>
          <ModalTitle>Add Visualization</ModalTitle>
          {selectedViz ? (
            <SelectedVizOptionsForm
              addVisualization={addVisualization}
              selectedViz={selectedViz}
              ros={ros}
              back={() => this.selectViz(null)}
            />
          ) : (
            <React.Fragment>
              <TabsHeader>
                {_.map(tabs, tabText => (
                  <TabsButton
                    key={tabText}
                    type="button"
                    selected={tabType === tabText}
                    onClick={() => this.updateTab(tabText)}
                  >
                    {tabText}
                  </TabsButton>
                ))}
              </TabsHeader>
              {tabType === tabs.vizType ? (
                <TabVizType
                  selectViz={this.selectViz}
                  rosTopics={rosTopics}
                  rosParams={rosParams}
                  closeModal={closeModal}
                />
              ) : (
                <TabTopicName
                  selectViz={this.selectViz}
                  rosTopics={rosTopics}
                  closeModal={closeModal}
                />
              )}
            </React.Fragment>
          )}
        </ModalContents>
      </ModalWrapper>
    );
  }
}

export default AddModal;
