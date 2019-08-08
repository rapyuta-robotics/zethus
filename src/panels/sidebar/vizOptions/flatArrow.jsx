import React from 'react';
import { DEFAULT_OPTIONS_FLATARROW } from 'amphion/src/utils/constants';

import OptionRow from '../../../components/optionRow';
import { Input } from '../../../components/styled';

class FlatArrowOptions extends React.PureComponent {
  render() {
    const { options: propsOptions, updateOptions } = this.props;
    const { alpha, arrowLength, color } = {
      ...DEFAULT_OPTIONS_FLATARROW,
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

        <OptionRow label="Arrow length">
          <Input
            name="arrowLength"
            type="number"
            data-id="arrowLength"
            value={arrowLength}
            onChange={updateOptions}
          />
        </OptionRow>
      </React.Fragment>
    );
  }
}

export default FlatArrowOptions;
