import React from 'react';
import _ from 'lodash';

import { vizOptions } from '../utils';

const stopPropagation = e => e.stopPropagation();

class AddModal extends React.Component {
  addVisualization(messageTypes) {
    const { addVisualization, closeModal } = this.props;
    addVisualization(messageTypes);
    closeModal();
  }
  render() {
    const { closeModal } = this.props;
    return (
      <div className="modal-wrapper" onClick={closeModal}>
        <div className="modal-contents" onClick={stopPropagation}>
          {
            _.map(vizOptions, op => (
              <button key={op.name} onClick={() => this.addVisualization(op.messageTypes)}>{op.name}</button>
            ))
          }
        </div>
      </div>
    );
  }
}

export default AddModal;
