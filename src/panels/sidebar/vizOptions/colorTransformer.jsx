import React from 'react';
import {
  AXES,
  COLOR_TRANSFORMERS,
  INTENSITY_CHANNEL_OPTIONS,
} from 'amphion/src/utils/constants';
import _ from 'lodash';

import OptionRow from '../../../components/optionRow';
import { Input, OptionContainer, Select } from '../../../components/styled';

const Intensity = props => {
  const {
    options: {
      channelName,
      useRainbow,
      minColor,
      maxColor,
      autocomputeIntensityBounds,
      maxIntensity,
      minIntensity,
    },
    updateOptions,
  } = props;

  return (
    <React.Fragment>
      <OptionRow label="Channel Name">
        <Select
          name="channelName"
          data-id="channelName"
          onChange={updateOptions}
          value={channelName}
        >
          {_.map(INTENSITY_CHANNEL_OPTIONS, channel => {
            return (
              <option key={channel} value={channel}>
                {channel}
              </option>
            );
          })}
        </Select>
      </OptionRow>
      {!useRainbow && (
        <React.Fragment>
          <OptionRow label="Min Color">
            <Input
              name="minColor"
              type="color"
              data-id="minColor"
              value={minColor}
              onChange={updateOptions}
            />
          </OptionRow>
          <OptionRow label="Max Color">
            <Input
              name="maxColor"
              type="color"
              data-id="maxColor"
              value={maxColor}
              onChange={updateOptions}
            />
          </OptionRow>
        </React.Fragment>
      )}
      {!autocomputeIntensityBounds && (
        <React.Fragment>
          <OptionRow label="Min Intensity">
            <Input
              type="number"
              name="minIntensity"
              data-id="minIntensity"
              value={minIntensity}
              onChange={updateOptions}
            />
          </OptionRow>
          <OptionRow label="Max Intensity">
            <Input
              type="number"
              name="maxIntensity"
              data-id="maxIntensity"
              value={maxIntensity}
              onChange={updateOptions}
            />
          </OptionRow>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const AxisColor = props => {
  const {
    options: { axis, autocomputeValueBounds, minAxisValue, maxAxisValue },
    updateOptions,
  } = props;

  return (
    <React.Fragment>
      <OptionRow label="Axis">
        <Select
          name="axis"
          data-id="axis"
          onChange={updateOptions}
          value={axis}
        >
          {_.map(AXES, a => {
            return (
              <option key={a} value={a}>
                {a}
              </option>
            );
          })}
        </Select>
      </OptionRow>
      {!autocomputeValueBounds && (
        <OptionContainer>
          <OptionRow label="Min Value">
            <Input
              type="number"
              name="minAxisValue"
              data-id="minAxisValue"
              value={minAxisValue}
              onChange={updateOptions}
            />
          </OptionRow>

          <OptionRow label="Max Value">
            <Input
              type="number"
              name="maxAxisValue"
              data-id="maxAxisValue"
              value={maxAxisValue}
              onChange={updateOptions}
            />
          </OptionRow>
        </OptionContainer>
      )}
    </React.Fragment>
  );
};

class ColorTransformer extends React.PureComponent {
  render() {
    const {
      options: { colorTransformer, flatColor },
      options,
      updateOptions,
    } = this.props;

    switch (colorTransformer) {
      case COLOR_TRANSFORMERS.INTENSITY:
        return <Intensity options={options} updateOptions={updateOptions} />;
      case COLOR_TRANSFORMERS.AXIS_COLOR:
        return <AxisColor options={options} updateOptions={updateOptions} />;
      case COLOR_TRANSFORMERS.FLAT_COLOR:
        return (
          <OptionRow label="Flat Color">
            <Input
              type="color"
              name="flatColor"
              data-id="flatColor"
              value={flatColor}
              onChange={updateOptions}
            />
          </OptionRow>
        );
      default:
        return null;
    }
  }
}

export default ColorTransformer;
