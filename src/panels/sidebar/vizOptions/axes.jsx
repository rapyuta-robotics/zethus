import React from 'react';
import { CONSTANTS } from 'amphion';
import OptionRow from '../../../components/optionRow';
import { Input } from '../../../components/styled';

const { DEFAULT_OPTIONS_AXES } = CONSTANTS;

class AxesOptions extends React.PureComponent {
  render() {
    const { options: propsOptions, updateOptions } = this.props;
    const { axesLength, axesRadius } = {
      ...DEFAULT_OPTIONS_AXES,
      ...propsOptions,
    };
    return (
      <>
        <OptionRow label="Axes Length">
          <Input
            name="axesLength"
            type="number"
            data-id="axesLength"
            value={axesLength}
            onChange={updateOptions}
          />
        </OptionRow>

        <OptionRow label="Axes Radius">
          <Input
            name="axesRadius"
            type="number"
            data-id="axesRadius"
            value={axesRadius}
            onChange={updateOptions}
          />
        </OptionRow>
      </>
    );
  }
}

export default AxesOptions;
