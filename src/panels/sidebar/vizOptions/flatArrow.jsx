import React from 'react';
import { DEFAULT_OPTIONS_FLATARROW } from 'amphion/src/utils/constants';

import OptionRow from '../../../components/optionRow';

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

        <OptionRow label="Arrow length">
          <input
            name="arrowLength"
            type="number"
            className="input"
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
