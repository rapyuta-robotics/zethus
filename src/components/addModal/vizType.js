import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';

const VizType = ({ modalVizOptions, selectedViz, selectViz }) => (
  <React.Fragment>
    <div className="type-selection">
      {_.map(modalVizOptions, op => {
        const vizAvailable = op.supported;
        return (
          <div key={op.name}>
            <button
              type="button"
              className={classNames({
                inactive: !vizAvailable,
                selected: _.get(selectedViz, 'name') === op.name,
              })}
              disabled={!vizAvailable}
              onClick={() => selectViz(op)}
            >
              <span className="type-image" />
              {op.name}
            </button>
          </div>
        );
      })}
    </div>
    <div className="type-info">
      {selectedViz ? (
        <React.Fragment>
          <h4>{selectedViz.name}</h4>
          <ReactMarkdown source={selectedViz.description} />
          <p>
            <a href={selectedViz.exampleLink}>View example</a>
            <br />
            <a href={selectedViz.docsLink}>View docs</a>
          </p>
        </React.Fragment>
      ) : (
        <p>
          No visualization selected.
          <br />
          Please choose a visualization on the left to see details
        </p>
      )}
    </div>
  </React.Fragment>
);

export default VizType;
