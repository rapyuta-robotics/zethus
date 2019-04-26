import React from 'react';

export const ARROW_OPTIONS_DEFAULTS = {
  arrowLength: 0.3,
};

const Arrow = props => {
  const {
    options: { alpha, shaftLength, shaftRadius, headLength, headRadius },
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
        <span>shaftLength:</span>
        <span>
          <input
            name="shaftLength"
            type="number"
            value={shaftLength}
            onChange={updateOptions}
          />
        </span>
      </div>
      <div className="option-section">
        <span>shaftRadius:</span>
        <span>
          <input
            name="shaftRadius"
            type="number"
            value={shaftRadius}
            onChange={updateOptions}
          />
        </span>
      </div>
      <div className="option-section">
        <span>HeadLength:</span>
        <span>
          <input
            name="headLength"
            type="number"
            value={headLength}
            onChange={updateOptions}
          />
        </span>
      </div>
      <div className="option-section">
        <span>headRadius:</span>
        <span>
          <input
            name="headRadius"
            type="number"
            value={headRadius}
            onChange={updateOptions}
          />
        </span>
      </div>
    </React.Fragment>
  );
};

export default Arrow;
