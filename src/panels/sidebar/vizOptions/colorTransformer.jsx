import React from 'react';
import {
  AXES,
  COLOR_TRANSFORMERS,
  INTENSITY_CHANNEL_OPTIONS,
} from 'amphion/src/utils/constants';
import _ from 'lodash';

import OptionRow from '../../../components/optionRow';

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
        <select
          name="channelName"
          className="input"
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
        </select>
      </OptionRow>
      {!useRainbow && (
        <React.Fragment>
          <OptionRow label="Min Color">
            <input
              name="minColor"
              type="color"
              data-id="minColor"
              className="input"
              value={minColor}
              onChange={updateOptions}
            />
          </OptionRow>
          <OptionRow label="Max Color">
            <input
              name="maxColor"
              type="color"
              className="input"
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
            <input
              type="number"
              name="minIntensity"
              className="input"
              data-id="minIntensity"
              value={minIntensity}
              onChange={updateOptions}
            />
          </OptionRow>
          <OptionRow label="Max Intensity">
            <input
              type="number"
              name="maxIntensity"
              className="input"
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
        <select
          name="axis"
          className="input"
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
        </select>
      </OptionRow>
      {!autocomputeValueBounds && (
        <div className="optionContainer">
          <OptionRow label="Min Value">
            <input
              type="number"
              name="minAxisValue"
              data-id="minAxisValue"
              className="input"
              value={minAxisValue}
              onChange={updateOptions}
            />
          </OptionRow>

          <OptionRow label="Max Value">
            <input
              type="number"
              name="maxAxisValue"
              data-id="maxAxisValue"
              className="input"
              value={maxAxisValue}
              onChange={updateOptions}
            />
          </OptionRow>
        </div>
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
            <input
              type="color"
              name="flatColor"
              data-id="flatColor"
              className="input"
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
