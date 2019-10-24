import React from 'react';
import { CONSTANTS } from 'amphion';
import OptionRow from '../../../components/optionRow';
import { updateOptionsUtil } from '../../../utils';
import { Input } from '../../../components/styled';

const { DEFAULT_OPTIONS_WRENCH } = CONSTANTS;

class WrenchOptions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.updateOptions = updateOptionsUtil.bind(this);
  }

  render() {
    const { options: propsOptions } = this.props;
    const {
      alpha,
      arrowWidth,
      forceArrowScale,
      forceColor,
      torqueArrowScale,
      torqueColor,
    } = {
      ...DEFAULT_OPTIONS_WRENCH,
      ...propsOptions,
    };
    return (
      <>
        <OptionRow label="forceColor">
          <Input
            type="color"
            name="forceColor"
            data-id="forceColor"
            value={forceColor}
            onChange={this.updateOptions}
          />
        </OptionRow>
        <OptionRow label="torqueColor">
          <Input
            type="color"
            name="torqueColor"
            data-id="torqueColor"
            value={torqueColor}
            onChange={this.updateOptions}
          />
        </OptionRow>
        <OptionRow label="alpha">
          <Input
            type="number"
            name="alpha"
            step="0.1"
            data-id="alpha"
            value={alpha}
            onChange={this.updateOptions}
          />
        </OptionRow>
        <OptionRow label="forceArrowScale">
          <Input
            type="number"
            name="forceArrowScale"
            step="0.1"
            data-id="forceArrowScale"
            value={forceArrowScale}
            onChange={this.updateOptions}
          />
        </OptionRow>
        <OptionRow label="torqueArrowScale">
          <Input
            type="number"
            name="torqueArrowScale"
            step="0.1"
            data-id="torqueArrowScale"
            value={torqueArrowScale}
            onChange={this.updateOptions}
          />
        </OptionRow>
        <OptionRow label="arrowWidth">
          <Input
            type="number"
            name="arrowWidth"
            step="0.1"
            data-id="arrowWidth"
            value={arrowWidth}
            onChange={this.updateOptions}
          />
        </OptionRow>
      </>
    );
  }
}

export default WrenchOptions;
