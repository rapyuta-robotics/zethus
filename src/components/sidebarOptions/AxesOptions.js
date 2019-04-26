import React from 'react';

export const AXES_OPTIONS_DEFAULTS = {
  axesLength: 1,
  axesRadius: 0.1,
};

const Axes = props => {
  const {
    options: { axesLength, axesRadius },
    updateOptions,
  } = props;

  return (
    <React.Fragment>
      <div className="option-section">
        <span>axesLength:</span>
        <span>
          <input
            name="axesLength"
            type="number"
            value={axesLength}
            onChange={updateOptions}
          />
        </span>
      </div>
      <div className="option-section">
        <span>axesRadius:</span>
        <span>
          <input
            name="axesRadius"
            type="number"
            value={axesRadius}
            onChange={updateOptions}
          />
        </span>
      </div>
    </React.Fragment>
  );
};

export default Axes;
