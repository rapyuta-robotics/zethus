import React from 'react';
import {
  COLOR_TRANSFORMERS,
  STYLE,
  INTENSITY_CHANNEL_OPTIONS,
  AXIS_OPTIONS,
} from 'amphion/src/viz/LaserScan';

const Intensity = props => {
  const {
    options: {
      channelName,
      useRainbow,
      invertRainbow,
      minColor,
      maxColor,
      autocomputeIntensityBounds,
      maxIntensity,
      minIntensity,
    },
    updateOptions,
    updateCheckbox,
  } = props;

  return (
    <React.Fragment>
      <div className="option-section">
        <span>Channel Name:</span>
        <span>
          <select
            name="channelName"
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
        </span>
      </div>
      <div className="option-section">
        <span>Use Rainbow:</span>
        <span>
          <input
            type="checkbox"
            name="useRainbow"
            value={useRainbow}
            onChange={updateCheckbox}
          />
        </span>
      </div>
      {useRainbow && (
        <div className="option-section">
          <span>Invert Rainbow:</span>
          <span>
            <input
              type="checkbox"
              name="invertRainbow"
              value={invertRainbow}
              onChange={updateCheckbox}
            />
          </span>
        </div>
      )}
      {!useRainbow && (
        <React.Fragment>
          <div className="option-section">
            <span>Min Color:</span>
            <span>
              <input
                name="minColor"
                type="color"
                value={minColor}
                onChange={updateOptions}
              />
            </span>
          </div>
          <div className="option-section">
            <span>Max Color:</span>
            <span>
              <input
                name="maxColor"
                type="color"
                value={maxColor}
                onChange={updateOptions}
              />
            </span>
          </div>
        </React.Fragment>
      )}
      <div className="option-section">
        <span>Autocompute Intensity Bounds:</span>
        <span>
          <input
            type="checkbox"
            name="autocomputeIntensityBounds"
            value={autocomputeIntensityBounds}
            onChange={updateCheckbox}
          />
        </span>
      </div>
      {!autocomputeIntensityBounds && (
        <React.Fragment>
          <div className="option-section">
            <span>Min Intensity:</span>
            <span>
              <input
                type="number"
                name="minIntensity"
                value={minIntensity}
                onChange={updateOptions}
              />
            </span>
          </div>
          <div className="option-section">
            <span>Max Intensity:</span>
            <span>
              <input
                type="number"
                name="maxIntensity"
                value={maxIntensity}
                onChange={updateOptions}
              />
            </span>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const AxisColor = props => {
  const {
    options: {
      axis,
      autocomputeValueBounds,
      useFixedFrame,
      minAxisValue,
      maxAxisValue,
    },
    updateOptions,
    updateCheckbox,
  } = props;

  return (
    <React.Fragment>
      <div className="option-section">
        <span>Axis:</span>
        <span>
          <select name="axis" onChange={updateOptions} value={axis}>
            {Object.keys(AXIS_OPTIONS).map(key => {
              return (
                <option key={key} value={AXIS_OPTIONS[key]}>
                  {AXIS_OPTIONS[key]}
                </option>
              );
            })}
          </select>
        </span>
      </div>
      <div className="option-section">
        <span>Autocompute Value Bounds:</span>
        <span>
          <input
            type="checkbox"
            name="autocomputeValueBounds"
            value={autocomputeValueBounds}
            onChange={updateCheckbox}
          />
        </span>
      </div>
      {!autocomputeValueBounds && (
        <React.Fragment>
          <div className="sub-section">
            <div className="option-section">
              <span>Min value:</span>
              <span>
                <input
                  type="number"
                  name="minAxisValue"
                  value={minAxisValue}
                  onChange={updateOptions}
                />
              </span>
            </div>
            <div className="option-section">
              <span>Max Value:</span>
              <span>
                <input
                  type="number"
                  name="maxAxisValue"
                  value={maxAxisValue}
                  onChange={updateOptions}
                />
              </span>
            </div>
          </div>
        </React.Fragment>
      )}
      <div className="option-section">
        <span>use Fixed Frame:</span>
        <span>
          <input
            type="checkbox"
            name="useFixedFrame"
            value={useFixedFrame}
            onChange={updateCheckbox}
          />
        </span>
      </div>
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
          <React.Fragment>
            <div className="option-section">
              <span>use Fixed Frame:</span>
              <span>
                <input
                  type="color"
                  name="flatColor"
                  value={flatColor}
                  onChange={this.updateOptions}
                />
              </span>
            </div>
          </React.Fragment>
        );
      default:
        return null;
    }
  }

  render() {
    const {
      options: {
        unreliable,
        selectable,
        style,
        size,
        alpha,
        decayTime,
        queueSize,
        colorTransformer,
      },
    } = this.props;

    return (
      <React.Fragment>
        <div className="option-section">
          <span>Unreliable:</span>
          <span>
            <input
              type="checkbox"
              name="unreliable"
              value={unreliable}
              onChange={this.updateCheckbox}
            />
          </span>
        </div>
        <div className="option-section">
          <span>Selectable:</span>
          <span>
            <input
              type="checkbox"
              name="selectable"
              value={selectable}
              onChange={this.updateCheckbox}
            />
          </span>
        </div>
        <div className="option-section">
          <span>Style:</span>
          <span>
            <select name="style" onChange={this.updateOptions} value={style}>
              {Object.keys(STYLE).map(key => {
                return (
                  <option key={key} value={STYLE[key]}>
                    {STYLE[key]}
                  </option>
                );
              })}
            </select>
          </span>
        </div>
        <div className="option-section">
          <span>Size:</span>
          <span>
            <input
              type="number"
              name="size"
              value={size}
              onChange={this.updateOptions}
            />
          </span>
        </div>
        <div className="option-section">
          <span>Alpha:</span>
          <span>
            <input
              type="number"
              name="alpha"
              value={alpha}
              onChange={this.updateOptions}
            />
          </span>
        </div>
        <div className="option-section">
          <span>Decay Time:</span>
          <span>
            <input
              type="number"
              name="decayTime"
              value={decayTime}
              onChange={this.updateOptions}
            />
          </span>
        </div>
        <div className="option-section">
          <span>Queue Size:</span>
          <span>
            <input
              type="number"
              name="queueSize"
              value={queueSize}
              onChange={this.updateOptions}
            />
          </span>
        </div>
        <div className="option-section">
          <span>Color Transformer:</span>
          <span>
            <select
              name="colorTransformer"
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
          </span>
        </div>
        {this.getColorTransformerComponent()}
      </React.Fragment>
    );
  }
}

export default LaserScan;
