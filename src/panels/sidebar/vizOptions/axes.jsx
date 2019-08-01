import React from 'react';
import { DEFAULT_OPTIONS_AXES } from 'amphion/src/utils/constants';

import OptionRow from '../../../components/optionRow';

class AxesOptions extends React.PureComponent {
  render() {
    const { options: propsOptions, updateOptions } = this.props;
    const { axesLength, axesRadius } = {
      ...DEFAULT_OPTIONS_AXES,
      ...propsOptions,
    };
    return (
      <React.Fragment>
        <OptionRow label="Axes Length">
          <input
            name="axesLength"
            type="number"
            className="input"
            data-id="axesLength"
            value={axesLength}
            onChange={updateOptions}
          />
        </OptionRow>

        <OptionRow label="Axes Radius">
          <input
            name="axesRadius"
            type="number"
            className="input"
            data-id="axesRadius"
            value={axesRadius}
            onChange={updateOptions}
          />
        </OptionRow>
      </React.Fragment>
    );
  }
}

export default AxesOptions;
