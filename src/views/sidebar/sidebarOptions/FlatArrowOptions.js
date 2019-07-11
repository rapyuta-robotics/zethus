import React from 'react';
import OptionRow from '../optionRow';

export const FLAT_ARROW_OPTIONS_DEFAULTS = {
  arrowLength: 0.3,
};

const FlatArrow = props => {
  const {
    options: { alpha, arrowLength, color },
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

      <OptionRow label="Arrow length">
        <input
          name="arrowLength"
          type="number"
          className="input"
          value={arrowLength}
          onChange={updateOptions}
        />
      </OptionRow>
    </React.Fragment>
  );
};

export default FlatArrow;
