import React from 'react';
import { CONSTANTS } from 'amphion';
import OptionRow from '../../../components/optionRow';
import { updateOptionsUtil } from '../../../utils';
import { Input } from '../../../components/styled';

const { DEFAULT_OPTIONS_POINT } = CONSTANTS;

class PointOptions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.updateOptions = updateOptionsUtil.bind(this);
  }

  render() {
    const { options: propsOptions } = this.props;
    const { alpha, color, radius } = {
      ...DEFAULT_OPTIONS_POINT,
      ...propsOptions,
    };
    return (
      <>
        <OptionRow label="Radius">
          <Input
            type="number"
            name="radius"
            step="0.01"
            data-id="radius"
            value={radius}
            onChange={this.updateOptions}
          />
        </OptionRow>
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
            step="0.01"
            data-id="alpha"
            value={alpha}
            onChange={this.updateOptions}
          />
        </OptionRow>
      </>
    );
  }
}

export default PointOptions;
