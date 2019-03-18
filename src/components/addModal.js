import React from 'react';
import _ from 'lodash';

import { vizOptions } from '../utils';

const stopPropagation = e => e.stopPropagation();

const AddModal = ({
  closeModal,
  addVisualization,
}) => (
  <div className="modal-wrapper" onClick={closeModal}>
    <div className="modal-contents" onClick={stopPropagation}>
      {
        _.map(vizOptions, op => (
          <button onClick={() => addVisualization(op.messageTypes)}>{op.name}</button>
        ))
      }
    </div>
  </div>
);

export default AddModal;
