import React from 'react';
import { DEFAULT_OPTIONS_ARROW } from 'amphion/src/utils/constants';

import OptionRow from '../../../components/optionRow';

class ArrowOptions extends React.PureComponent {
  render() {
    const { options: propsOptions, updateOptions } = this.props;

    const { color, alpha, shaftLength, shaftRadius, headLength, headRadius } = {
      ...DEFAULT_OPTIONS_ARROW,
      ...propsOptions,
    };

    return (
      <React.Fragment>
        <OptionRow label="Color">
          <input
            name="color"
            type="color"
            className="input"
            value={color}
            data-id="color"
            onChange={updateOptions}
          />
        </OptionRow>

        <OptionRow label="Alpha">
          <input
            name="alpha"
            type="number"
            className="input"
            value={alpha}
            data-id="alpha"
            onChange={updateOptions}
          />
        </OptionRow>

        <OptionRow label="Shaft Length">
          <input
            name="shaftLength"
            type="number"
            className="input"
            value={shaftLength}
            data-id="shaftLength"
            onChange={updateOptions}
          />
        </OptionRow>

        <OptionRow label="Shaft Radius">
          <input
            name="shaftRadius"
            type="number"
            className="input"
            value={shaftRadius}
            data-id="shaftRadius"
            onChange={updateOptions}
          />
        </OptionRow>

        <OptionRow label="Head Length">
          <input
            name="headLength"
            type="number"
            className="input"
            value={headLength}
            data-id="headLength"
            onChange={updateOptions}
          />
        </OptionRow>

        <OptionRow label="Head Radius">
          <input
            name="headRadius"
            type="number"
            className="input"
            value={headRadius}
            data-id="headRadius"
            onChange={updateOptions}
          />
        </OptionRow>
      </React.Fragment>
    );
  }
}

export default ArrowOptions;
