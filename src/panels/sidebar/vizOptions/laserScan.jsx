import React from 'react';
import _ from 'lodash';
import {
  COLOR_TRANSFORMERS,
  LASERSCAN_STYLES,
  DEFAULT_OPTIONS_LASERSCAN,
} from 'amphion/src/utils/constants';
import OptionRow from '../../../components/optionRow';
import ColorTransformer from './colorTransformer';
import { updateOptionsUtil } from '../../../utils';

class LaserScanOptions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.updateOptions = updateOptionsUtil.bind(this);
  }

  render() {
    const { options: propsOptions } = this.props;

    const options = {
      ...DEFAULT_OPTIONS_LASERSCAN,
      ...propsOptions,
    };
    const { style, size, alpha, colorTransformer } = options;

    return (
      <React.Fragment>
        <OptionRow label="Style">
          <select
            name="style"
            className="input"
            data-id="style"
            onChange={this.updateOptions}
            value={style}
          >
            {_.map(LASERSCAN_STYLES, lStyle => {
              return (
                <option key={lStyle} value={lStyle}>
                  {lStyle}
                </option>
              );
            })}
          </select>
        </OptionRow>

        <OptionRow label="Size">
          <input
            type="number"
            name="size"
            className="input"
            data-id="size"
            value={size}
            onChange={this.updateOptions}
          />
        </OptionRow>

        <OptionRow label="Alpha">
          <input
            type="number"
            name="alpha"
            className="input"
            data-id="alpha"
            value={alpha}
            onChange={this.updateOptions}
          />
        </OptionRow>

        <OptionRow label="Color Transformer">
          <select
            name="colorTransformer"
            className="input"
            data-id="colorTransformer"
            onChange={this.updateOptions}
            value={colorTransformer}
          >
            {_.map(COLOR_TRANSFORMERS, color => {
              return (
                <option key={color} value={color}>
                  {color}
                </option>
              );
            })}
          </select>
        </OptionRow>
        {
          <ColorTransformer
            options={options}
            updateOptions={this.updateOptions}
          />
        }
      </React.Fragment>
    );
  }
}

export default LaserScanOptions;
