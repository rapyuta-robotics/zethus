import React from 'react';
import _ from 'lodash';

import { vizOptions } from '../utils';

const stopPropagation = e => e.stopPropagation();

class AddModal extends React.Component {
  addVisualization(messageTypes, isDisplay) {
    const { addVisualization, closeModal } = this.props;
    addVisualization(messageTypes, isDisplay);
    closeModal();
  }

  render() {
    const { closeModal } = this.props;
    return (
      <div className="modal-wrapper" onClick={closeModal}>
        <div className="modal-contents" onClick={stopPropagation}>
          <h2 className="modal-title">Create Visualization</h2>
          <div className="type-container">
            <div className="type-selection">
              {
                _.map(vizOptions, op => (
                  <div key={op.name}>
                    <button
                      type="button"
                      className={!op.enabled ? 'inactive' : ''}
                      disabled={!op.enabled}
                      onClick={() => this.addVisualization(op.messageTypes, op.isDisplay)}
                    >
                      <span className="type-image" />
                      {op.name}
                    </button>
                  </div>
                ))
              }
            </div>
            <div className="type-info">
              <p className="type-description">Description</p>
              <div><a href="#">view example</a></div>
              <div><a href="#">view docs</a></div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default AddModal;
