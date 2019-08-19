import React from 'react';
import _ from 'lodash';
import {
  DEFAULT_OPTIONS_POINTCLOUD,
  POINTCLOUD_COLOR_CHANNELS,
} from 'amphion/src/utils/constants';
import OptionRow from '../../../components/optionRow';
import { updateOptionsUtil } from '../../../utils';
import { Input, Select } from '../../../components/styled';

class PointCloudOptions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.updateOptions = updateOptionsUtil.bind(this);
  }

  render() {
    const { options: propsOptions } = this.props;

    const options = {
      ...DEFAULT_OPTIONS_POINTCLOUD,
      ...propsOptions,
    };
    const { colorChannel, size, useRainbow } = options;

    return (
      <React.Fragment>
        <OptionRow label="Color channel">
          <Select
            name="colorChannel"
            data-id="colorChannel"
            onChange={this.updateOptions}
            value={colorChannel}
          >
            {_.map(POINTCLOUD_COLOR_CHANNELS, lStyle => {
              return (
                <option key={lStyle} value={lStyle}>
                  {lStyle}
                </option>
              );
            })}
          </Select>
        </OptionRow>

        <OptionRow label="Size">
          <Input
            type="number"
            name="size"
            data-id="size"
            value={size}
            onChange={this.updateOptions}
          />
        </OptionRow>

        {colorChannel === POINTCLOUD_COLOR_CHANNELS.INTENSITY && (
          <OptionRow label="Use Rainbow">
            <Input
              type="checkbox"
              name="useRainbow"
              data-id="useRainbow"
              value={useRainbow}
              onChange={this.updateOptions}
            />
          </OptionRow>
        )}
      </React.Fragment>
    );
  }
}

export default PointCloudOptions;
