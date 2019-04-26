import React from 'react';

export const FLAT_ARROW_OPTIONS_DEFAULTS = {
  shaftLength: 1,
  shaftRadius: 0.05,
  headLength: 0.3,
  headRadius: 0.1,
};

const FlatArrow = props => {
  const {
    options: { alpha, arrowLength },
    updateOptions,
  } = props;

  return (
    <React.Fragment>
      <div className="option-section">
        <span>Color:</span>
        <span>
          <input name="color" type="color" onChange={updateOptions} />
        </span>
      </div>
      <div className="option-section">
        <span>alpha:</span>
        <span>
          <input
            name="alpha"
            type="number"
            value={alpha}
            onChange={updateOptions}
          />
        </span>
      </div>
      <div className="option-section">
        <span>Arrow Length:</span>
        <span>
          <input
            name="arrowLength"
            type="number"
            value={arrowLength}
            onChange={updateOptions}
          />
        </span>
      </div>
    </React.Fragment>
  );
};

export default FlatArrow;
