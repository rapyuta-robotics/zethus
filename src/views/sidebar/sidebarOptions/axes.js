import React from 'react';
import OptionRow from '../optionRow';

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
      <OptionRow label="Axes Length">
        <input
          name="axesLength"
          type="number"
          className="input"
          value={axesLength}
          onChange={updateOptions}
        />
      </OptionRow>

      <OptionRow label="Axes Radius">
        <input
          name="axesRadius"
          type="number"
          className="input"
          value={axesRadius}
          onChange={updateOptions}
        />
      </OptionRow>
    </React.Fragment>
  );
};

export default Axes;
