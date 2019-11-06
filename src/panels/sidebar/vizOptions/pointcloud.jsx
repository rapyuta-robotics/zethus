import React from 'react';
import _ from 'lodash';
import { CONSTANTS } from 'amphion';
import OptionRow from '../../../components/optionRow';
import { updateOptionsUtil } from '../../../utils';
import { Input, Select } from '../../../components/styled';

const { DEFAULT_OPTIONS_POINTCLOUD, POINTCLOUD_COLOR_CHANNELS } = CONSTANTS;

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
      <>
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
              checked={useRainbow}
              onChange={this.updateOptions}
            />
          </OptionRow>
        )}
      </>
    );
  }
}

export default PointCloudOptions;
