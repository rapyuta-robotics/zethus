import React from 'react';
import { DEFAULT_OPTIONS_ARROW } from 'amphion/src/utils/constants';

import OptionRow from '../../../components/optionRow';
import { Input } from '../../../components/styled';

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
          <Input
            name="color"
            type="color"
            value={color}
            data-id="color"
            onChange={updateOptions}
          />
        </OptionRow>

        <OptionRow label="Alpha">
          <Input
            name="alpha"
            type="number"
            value={alpha}
            data-id="alpha"
            onChange={updateOptions}
          />
        </OptionRow>

        <OptionRow label="Shaft Length">
          <Input
            name="shaftLength"
            type="number"
            value={shaftLength}
            data-id="shaftLength"
            onChange={updateOptions}
          />
        </OptionRow>

        <OptionRow label="Shaft Radius">
          <Input
            name="shaftRadius"
            type="number"
            value={shaftRadius}
            data-id="shaftRadius"
            onChange={updateOptions}
          />
        </OptionRow>

        <OptionRow label="Head Length">
          <Input
            name="headLength"
            type="number"
            value={headLength}
            data-id="headLength"
            onChange={updateOptions}
          />
        </OptionRow>

        <OptionRow label="Head Radius">
          <Input
            name="headRadius"
            type="number"
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
