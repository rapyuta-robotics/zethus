import React from 'react';
import _ from 'lodash';

import { COLOR_SCHEMES } from 'amphion/src/viz/Map';
import OptionRow from '../optionRow';

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
      options: { alpha, colorScheme, drawBehind },
    } = this.props;
    const {
      resolution,
      width,
      height,
      origin: { position, orientation: quaternion },
    } = this.state;
    const { x: posX, y: posY, z: posZ } = position;
    const { x: quatX, y: quatY, z: quatZ, w: quatW } = quaternion;
    const parsedPos = `${posX.toFixed(2)},  ${posY.toFixed(2)}, ${posZ.toFixed(
      2,
    )}`;
    const parsedQuat = `${quatX.toFixed(2)}, ${quatY.toFixed(
      2,
    )}, ${quatZ.toFixed(2)}, ${quatW.toFixed(2)}`;

    return (
      <React.Fragment>
        <OptionRow label="Alpha">
          <input
            type="number"
            name="alpha"
            className="input"
            value={alpha}
            onChange={this.updateOptions}
          />
        </OptionRow>
        <OptionRow label="Color Scheme">
          <select
            name="colorScheme"
            className="input"
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
        </OptionRow>
        <OptionRow label="Draw Behind">
          <input
            type="checkbox"
            name="drawBehind"
            className="input"
            value={drawBehind}
            onChange={this.updateCheckbox}
          />
        </OptionRow>

        <OptionRow label="Resolution">{resolution.toFixed(2)}</OptionRow>

        <OptionRow label="Width">{width}</OptionRow>

        <OptionRow label="Height">{height}</OptionRow>

        <OptionRow label="Position (x, y, z)">{parsedPos}</OptionRow>

        <OptionRow label="Quaternion (x, y, z, w)">{parsedQuat}</OptionRow>
      </React.Fragment>
    );
  }
}

export default Map;
