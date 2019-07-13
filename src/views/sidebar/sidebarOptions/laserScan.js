import React from 'react';
import {
  COLOR_TRANSFORMERS,
  STYLE,
  INTENSITY_CHANNEL_OPTIONS,
  AXIS_OPTIONS,
} from 'amphion/src/viz/LaserScan';
import OptionRow from '../optionRow';

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
          onChange={updateOptions}
          value={channelName}
        >
          {Object.keys(INTENSITY_CHANNEL_OPTIONS).map(key => {
            return (
              <option key={key} value={INTENSITY_CHANNEL_OPTIONS[key]}>
                {INTENSITY_CHANNEL_OPTIONS[key]}
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
              value={minIntensity}
              onChange={updateOptions}
            />
          </OptionRow>
          <OptionRow label="Max Intensity">
            <input
              type="number"
              name="maxIntensity"
              className="input"
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
          onChange={updateOptions}
          value={axis}
        >
          {Object.keys(AXIS_OPTIONS).map(key => {
            return (
              <option key={key} value={AXIS_OPTIONS[key]}>
                {AXIS_OPTIONS[key]}
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
              className="input"
              value={minAxisValue}
              onChange={updateOptions}
            />
          </OptionRow>

          <OptionRow label="Max Value">
            <input
              type="number"
              name="maxAxisValue"
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

class LaserScan extends React.Component {
  constructor(props) {
    super(props);

    this.updateOptions = this.updateOptions.bind(this);
    this.updateCheckbox = this.updateCheckbox.bind(this);
  }

  updateOptions(e) {
    const { updateOptions } = this.props;
    const { options } = this.props;
    const newOptions = { ...options };

    newOptions[e.target.name] = e.target.value;
    updateOptions(newOptions);
  }

  updateCheckbox(e) {
    const { updateOptions } = this.props;
    const { options } = this.props;
    const newOptions = { ...options };

    newOptions[e.target.name] = e.target.checked;
    updateOptions(newOptions);
  }

  getColorTransformerComponent() {
    const {
      options: { colorTransformer, flatColor },
    } = this.props;
    const newProps = {
      ...this.props,
      updateOptions: this.updateOptions,
      updateCheckbox: this.updateCheckbox,
    };

    switch (colorTransformer) {
      case COLOR_TRANSFORMERS.INTENSITY:
        return <Intensity {...newProps} />;
      case COLOR_TRANSFORMERS.AXIS_COLOR:
        return <AxisColor {...newProps} />;
      case COLOR_TRANSFORMERS.FLAT_COLOR:
        return (
          <OptionRow label="Flat Color">
            <input
              type="color"
              name="flatColor"
              className="input"
              value={flatColor}
              onChange={this.updateOptions}
            />
          </OptionRow>
        );
      default:
        return null;
    }
  }

  render() {
    const {
      options: { style, size, alpha, colorTransformer },
    } = this.props;

    return (
      <React.Fragment>
        <OptionRow label="Style">
          <select
            name="style"
            className="input"
            onChange={this.updateOptions}
            value={style}
          >
            {Object.keys(STYLE).map(key => {
              return (
                <option key={key} value={STYLE[key]}>
                  {STYLE[key]}
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
            value={size}
            onChange={this.updateOptions}
          />
        </OptionRow>

        <OptionRow label="Alpha">
          <input
            type="number"
            name="alpha"
            className="input"
            value={alpha}
            onChange={this.updateOptions}
          />
        </OptionRow>

        <OptionRow label="Color Transformer">
          <select
            name="colorTransformer"
            className="input"
            onChange={this.updateOptions}
            value={colorTransformer}
          >
            {Object.keys(COLOR_TRANSFORMERS).map(key => {
              return (
                <option key={key} value={COLOR_TRANSFORMERS[key]}>
                  {COLOR_TRANSFORMERS[key]}
                </option>
              );
            })}
          </select>
        </OptionRow>
        {this.getColorTransformerComponent()}
      </React.Fragment>
    );
  }
}

export default LaserScan;
