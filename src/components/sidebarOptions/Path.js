import React from 'react';
import {
  OBJECT_TYPE_ARROW,
  OBJECT_TYPE_AXES,
} from 'amphion/src/utils/constants';
import Arrow from './ArrowOptions';
import Axes from './AxesOptions';
import { LINE_STYLES } from '../../utils';

class Path extends React.Component {
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

  getShape() {
    const { options } = this.props;
    const { poseStyle } = options;

    switch (poseStyle) {
      case OBJECT_TYPE_ARROW:
        return <Arrow updateOptions={this.updateOptions} options={options} />;
      case OBJECT_TYPE_AXES:
        return <Axes updateOptions={this.updateOptions} options={options} />;
      default:
        return null;
    }
  }

  render() {
    const {
      options: { unreliable, lineStyle, color, alpha, bufferLength, poseStyle },
    } = this.props;
    return (
      <React.Fragment>
        <div className="option-section">
          <span>Unreliable:</span>
          <input
            name="unreliable"
            type="checkbox"
            value={unreliable}
            onChange={this.updateOptions}
          />
        </div>
        <div className="option-section">
          <span>Line Style:</span>
          <span>
            <select
              name="lineStyle"
              onChange={this.updateOptions}
              value={lineStyle}
            >
              {Object.keys(LINE_STYLES).map(key => {
                return (
                  <option key={key} value={LINE_STYLES[key]}>
                    {LINE_STYLES[key]}
                  </option>
                );
              })}
            </select>
          </span>
        </div>
        <div className="option-section">
          <span>Color:</span>
          <span>
            <input
              type="color"
              name="color"
              value={color}
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
          <span>Buffer Length:</span>
          <span>
            <input
              type="number"
              name="bufferLength"
              value={bufferLength}
              onChange={this.updateOptions}
            />
          </span>
        </div>
        <div className="option-section">
          <span>Pose Style:</span>
          <span>
            <select
              name="poseStyle"
              onChange={this.updateOptions}
              value={poseStyle}
            >
              <option key="None" value="None">
                None
              </option>
              <option key={OBJECT_TYPE_ARROW} value={OBJECT_TYPE_ARROW}>
                {OBJECT_TYPE_ARROW}
              </option>
              <option key={OBJECT_TYPE_AXES} value={OBJECT_TYPE_AXES}>
                {OBJECT_TYPE_AXES}
              </option>
            </select>
          </span>
        </div>
        <div className="sub-section">{this.getShape()}</div>
      </React.Fragment>
    );
  }
}

export default Path;
