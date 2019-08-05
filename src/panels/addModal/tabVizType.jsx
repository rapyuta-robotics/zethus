import React from 'react';
import _ from 'lodash';
import { vizOptions } from '../../utils';
import VizTypeItem from './vizTypeItem';
import VizTypeDetails from './vizTypeDetails';

class VizType extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedViz: '',
    };
    this.selectViz = this.selectViz.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  selectViz(vizType, topicName, messageType) {
    this.setState({
      selectedViz: {
        vizType,
        topicName,
        messageType,
      },
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { selectViz } = this.props;
    const {
      selectedViz: { vizType, topicName, messageType },
    } = this.state;
    selectViz(vizType, topicName, messageType);
  }

  render() {
    const { selectedViz } = this.state;
    const { rosTopics, rosParams, closeModal } = this.props;
    return (
      <form onSubmit={this.onSubmit} className="addVizForm">
        <div className="type-container">
          <div className="type-selection">
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
          </div>
          <div className="type-info">
            {selectedViz ? (
              <VizTypeDetails vizType={selectedViz.vizType} />
            ) : (
              <p>
                No visualization selected.
                <br />
                Please choose a visualization on the left to see details
              </p>
            )}
          </div>
        </div>
        <div className="modal-actions">
          <div className="flexGrow" />
          <button type="submit" className="btn-primary" disabled={!selectedViz}>
            Proceed
          </button>
          <button type="button" className="btn-primary" onClick={closeModal}>
            Close
          </button>
        </div>
      </form>
    );
  }
}

export default VizType;
