import React from 'react';
import { DEFAULT_OPTIONS_RANGE } from 'amphion/src/utils/constants';
import OptionRow from '../../../components/optionRow';
import { updateOptionsUtil } from '../../../utils';
import { Input } from '../../../components/styled';

class RangeOptions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.updateOptions = updateOptionsUtil.bind(this);
  }

  render() {
    const { options: propsOptions } = this.props;
    const { alpha, color } = {
      ...DEFAULT_OPTIONS_RANGE,
      ...propsOptions,
    };
    return (
      <React.Fragment>
        <OptionRow label="Color">
          <Input
            type="color"
            name="color"
            data-id="color"
            value={color}
            onChange={this.updateOptions}
          />
        </OptionRow>
        <OptionRow label="Alpha">
          <Input
            type="number"
            name="alpha"
            data-id="alpha"
            value={alpha}
            onChange={this.updateOptions}
          />
        </OptionRow>
      </React.Fragment>
    );
  }
}

export default RangeOptions;
