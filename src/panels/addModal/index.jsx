import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';

import '../../styles/modal.scss';

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
      closeModal,
      rosTopics,
      rosParams,
      ros,
      addVisualization,
    } = this.props;
    const { tabType, selectedViz } = this.state;
    return (
      <div className="modal-wrapper" onClick={closeModal}>
        <div className="modal-contents" onClick={stopPropagation}>
          <h2 className="modal-title">Add Visualization</h2>
          {selectedViz ? (
            <SelectedVizOptionsForm
              addVisualization={addVisualization}
              selectedViz={selectedViz}
              ros={ros}
              back={() => this.selectViz(null)}
            />
          ) : (
            <React.Fragment>
              <div className="flex tabs-header">
                {_.map(tabs, tabText => (
                  <button
                    key={tabText}
                    type="button"
                    className={classNames({
                      selected: tabType === tabText,
                      'tabs-button': true,
                    })}
                    onClick={() => this.updateTab(tabText)}
                  >
                    {tabText}
                  </button>
                ))}
              </div>
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
        </div>
      </div>
    );
  }
}

export default AddModal;
