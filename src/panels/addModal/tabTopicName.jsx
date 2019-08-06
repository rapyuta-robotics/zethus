import React from 'react';
import _ from 'lodash';
import { vizOptions } from '../../utils';
import classNames from 'classnames';

class TopicName extends React.Component {
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
    const { rosTopics, closeModal } = this.props;
    const { selectedViz } = this.state;
    return (
      <form onSubmit={this.onSubmit} className="addVizForm">
        <div className="type-container">
          <div className="type-selection">
            {_.map(_.sortBy(rosTopics, 'name'), ({ name, messageType }) => {
              const vizOption = _.find(vizOptions, v =>
                _.includes(v.messageTypes, messageType),
              );
              return vizOption ? (
                <button
                  type="button"
                  className={classNames({
                    topicRow: true,
                    flex: true,
                    selected: _.get(selectedViz, 'topicName') === name,
                  })}
                  key={name}
                  onClick={() =>
                    this.selectViz(vizOption.type, name, messageType)
                  }
                >
                  {name}
                  <span className="flexGrow" />({messageType})
                </button>
              ) : (
                <div className="flex typeUnsupported" key={name}>
                  {name}
                  <span className="flexGrow" />
                  (Unsupported type: {messageType})
                </div>
              );
            })}
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

export default TopicName;
