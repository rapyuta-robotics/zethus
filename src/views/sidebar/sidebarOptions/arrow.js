import React from 'react';
import OptionRow from '../optionRow';

export const ARROW_OPTIONS_DEFAULTS = {
  shaftLength: 1,
  shaftRadius: 0.05,
  headLength: 0.3,
  headRadius: 0.1,
};

const Arrow = props => {
  const {
    options: { alpha, color, shaftLength, shaftRadius, headLength, headRadius },
    updateOptions,
  } = props;

  return (
    <React.Fragment>
      <OptionRow label="Color">
        <input
          name="color"
          type="color"
          className="input"
          value={color}
          onChange={updateOptions}
        />
      </OptionRow>

      <OptionRow label="Alpha">
        <input
          name="alpha"
          type="number"
          className="input"
          value={alpha}
          onChange={updateOptions}
        />
      </OptionRow>

      <OptionRow label="Shaft Length">
        <input
          name="shaftLength"
          type="number"
          className="input"
          value={shaftLength}
          onChange={updateOptions}
        />
      </OptionRow>

      <OptionRow label="Shaft Radius">
        <input
          name="shaftRadius"
          type="number"
          className="input"
          value={shaftRadius}
          onChange={updateOptions}
        />
      </OptionRow>

      <OptionRow label="Head Length">
        <input
          name="headLength"
          type="number"
          className="input"
          value={headLength}
          onChange={updateOptions}
        />
      </OptionRow>

      <OptionRow label="Head Radius">
        <input
          name="headRadius"
          type="number"
          className="input"
          value={headRadius}
          onChange={updateOptions}
        />
      </OptionRow>
    </React.Fragment>
  );
};

export default Arrow;
