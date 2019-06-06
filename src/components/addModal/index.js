import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';

import {
  MESSAGE_TYPE_ROBOT_MODEL,
  SUPPORTED_MESSAGE_TYPES,
} from 'amphion/src/utils/constants';

import { vizOptions } from '../../utils';
import VizType from './vizType';
import TopicName from './topicName';
import SelectedVizOptionsForm from './options';

const stopPropagation = e => e.stopPropagation();

const modalVizOptions = _.map(vizOptions, opt => ({
  ...opt,
  supported: _.some(opt.messageTypes, mt =>
    _.includes(SUPPORTED_MESSAGE_TYPES, mt),
  ),
}));

const tabs = {
  vizType: 'Visualization type',
  topicName: 'Topic name',
};

const hasAdditionalOptions = messageType =>
  _.includes([MESSAGE_TYPE_ROBOT_MODEL], messageType);

class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedViz: null,
      tabType: tabs.vizType,
      optionsForm: false,
    };

    this.addVisualization = this.addVisualization.bind(this);
    this.selectViz = this.selectViz.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.updateTab = this.updateTab.bind(this);
    this.toggleOptionsForm = this.toggleOptionsForm.bind(this);
  }

  addVisualization(messageTypes, isDisplay, displayName, options) {
    const { addVisualization, closeModal } = this.props;
    addVisualization(messageTypes, isDisplay, displayName, options);
    closeModal();
  }

  selectViz(selectedViz) {
    this.setState({
      selectedViz,
    });
  }

  updateTab(tabType) {
    this.setState({
      tabType,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const {
      selectedViz: { messageTypes, isDisplay, name, defaultOptions },
    } = this.state;
    if (hasAdditionalOptions(messageTypes[0])) {
      this.toggleOptionsForm();
      return;
    }
    this.addVisualization(messageTypes, isDisplay, name, defaultOptions);
  }

  toggleOptionsForm() {
    this.setState({ optionsForm: !this.state.optionsForm });
  }

  render() {
    const { closeModal, rosTopics, addVisualizationByTopic } = this.props;
    const { selectedViz, tabType, optionsForm } = this.state;
    return (
      <div className="modal-wrapper" onClick={closeModal}>
        {optionsForm && (
          <SelectedVizOptionsForm
            selectedViz={selectedViz}
            toggleOptionsForm={this.toggleOptionsForm}
            addVisualization={this.addVisualization}
          />
        )}
        {!optionsForm && (
          <form
            className="modal-contents"
            onClick={stopPropagation}
            onSubmit={this.onSubmit}
          >
            <h2 className="modal-title">Add Visualization</h2>
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
            <div className="type-container">
              {tabType === tabs.vizType ? (
                <VizType
                  modalVizOptions={modalVizOptions}
                  selectedViz={selectedViz}
                  selectViz={this.selectViz}
                />
              ) : (
                <TopicName
                  rosTopics={rosTopics}
                  addVisualizationByTopic={addVisualizationByTopic}
                  closeModal={closeModal}
                />
              )}
            </div>
            <div className="modal-actions">
              <div className="flex-gap" />
              <button
                type="submit"
                className="btn-primary"
                disabled={!selectedViz}
              >
                Add Visualization
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default AddModal;
