import React from 'react';
import { CONSTANTS } from 'amphion';

import OptionRow from '../../../components/optionRow';
import { Input } from '../../../components/styled';

const { DEFAULT_OPTIONS_FLATARROW } = CONSTANTS;

class FlatArrowOptions extends React.PureComponent {
  render() {
    const { options: propsOptions, updateOptions } = this.props;
    const { alpha, arrowLength, color } = {
      ...DEFAULT_OPTIONS_FLATARROW,
      ...propsOptions,
    };
    return (
      <>
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

        <OptionRow label="Arrow length">
          <Input
            name="arrowLength"
            type="number"
            data-id="arrowLength"
            value={arrowLength}
            onChange={updateOptions}
          />
        </OptionRow>
      </>
    );
  }
}

export default FlatArrowOptions;
