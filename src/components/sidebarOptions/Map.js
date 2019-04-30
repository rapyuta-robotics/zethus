import React from 'react';
import _ from 'lodash';

import { COLOR_SCHEMES } from 'amphion/src/viz/Map';

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resolution: 0,
      width: 0,
      height: 0,
      origin: {
        position: { x: 0, y: 0, z: 0 },
        orientation: { x: 0, y: 0, z: 0, w: 0 },
      },
    };

    this.getMapMessage = this.getMapMessage.bind(this);
    this.updateOptions = this.updateOptions.bind(this);
    this.updateCheckbox = this.updateCheckbox.bind(this);

    const { rosObject } = props;
    rosObject.onMessage(this.getMapMessage);
  }

  getMapMessage(message) {
    const { info } = message;
    const { resolution, width, height, origin } = info;
    const newInfo = {
      resolution,
      width,
      height,
      origin,
    };
    if (!_.isMatch(newInfo, this.state)) {
      this.setState({ ...newInfo });
    }
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

  render() {
    const {
      options: { unreliable, alpha, colorScheme, drawBehind },
    } = this.props;
    const {
      resolution,
      width,
      height,
      origin: { position, orientation: quaternion },
    } = this.state;
    const { x: posX, y: posY, z: posZ } = position;
    const { x: quatX, y: quatY, z: quatZ, w: quatW } = quaternion;
    const parsedPos = `${posX.toFixed(2)}; ${posY.toFixed(2)}; ${posZ.toFixed(
      2,
    )}`;
    const parsedQuat = `${quatX.toFixed(2)}; ${quatY.toFixed(
      2,
    )}; ${quatZ.toFixed(2)}; ${quatW.toFixed(2)}`;

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
          <span>Color Scheme:</span>
          <span>
            <select
              name="colorScheme"
              onChange={this.updateOptions}
              value={colorScheme}
            >
              {Object.keys(COLOR_SCHEMES).map(key => {
                return (
                  <option key={key} value={COLOR_SCHEMES[key]}>
                    {COLOR_SCHEMES[key]}
                  </option>
                );
              })}
            </select>
          </span>
        </div>
        <div className="option-section">
          <span>Draw Behind:</span>
          <span>
            <input
              type="checkbox"
              name="drawBehind"
              value={drawBehind}
              onChange={this.updateCheckbox}
            />
          </span>
        </div>
        <div className="option-section">
          <span>Resolution:</span>
          <span>
            <input
              type="number"
              name="resolution"
              value={resolution.toFixed(2)}
              disabled
            />
          </span>
        </div>
        <div className="option-section">
          <span>Width:</span>
          <span>
            <input type="number" name="width" value={width} disabled />
          </span>
        </div>
        <div className="option-section">
          <span>Height:</span>
          <span>
            <input type="number" name="height" value={height} disabled />
          </span>
        </div>
        {/* Position Sub section */}
        <div className="option-section">
          <span>Position:</span>
          <span>
            <input type="text" name="position" value={parsedPos} disabled />
          </span>
        </div>
        <div className="sub-section">
          <div className="option-section">
            <span>X:</span>
            <span>
              <input type="number" name="x" value={posX.toFixed(2)} disabled />
            </span>
          </div>
          <div className="option-section">
            <span>Y:</span>
            <span>
              <input type="number" name="y" value={posY.toFixed(2)} disabled />
            </span>
          </div>
          <div className="option-section">
            <span>Z:</span>
            <span>
              <input type="number" name="z" value={posZ.toFixed(2)} disabled />
            </span>
          </div>
        </div>
        {/* Quaternion Sub section */}
        <div className="option-section">
          <span>Quaternion:</span>
          <span>
            <input type="text" name="quaternion" value={parsedQuat} disabled />
          </span>
        </div>
        <div className="sub-section">
          <div className="option-section">
            <span>X:</span>
            <span>
              <input type="number" name="x" value={quatX.toFixed(2)} disabled />
            </span>
          </div>
          <div className="option-section">
            <span>Y:</span>
            <span>
              <input type="number" name="y" value={quatY.toFixed(2)} disabled />
            </span>
          </div>
          <div className="option-section">
            <span>Z:</span>
            <span>
              <input type="number" name="z" value={quatZ.toFixed(2)} disabled />
            </span>
          </div>
          <div className="option-section">
            <span>W:</span>
            <span>
              <input type="number" name="w" value={quatW.toFixed(2)} disabled />
            </span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Map;
