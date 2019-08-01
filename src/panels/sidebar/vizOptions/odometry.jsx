import React from 'react';
import _ from 'lodash';

import {
  DEFAULT_OPTIONS_ODOMETRY,
  OBJECT_TYPE_ARROW,
  OBJECT_TYPE_AXES,
} from 'amphion/src/utils/constants';
import OptionRow from '../../../components/optionRow';
import ShapeOptions from './shape';
import { updateOptionsUtil } from '../../../utils';

class OdometryOptions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.updateOptions = updateOptionsUtil.bind(this);
  }

  render() {
    const { options: propsOptions } = this.props;
    const options = {
      ...DEFAULT_OPTIONS_ODOMETRY,
      ...propsOptions,
    };
    const {
      type: shapeType,
      positionTolerance,
      angleTolerance,
      keep,
    } = options;

    return (
      <React.Fragment>
        <OptionRow label="Position Tolerance">
          <input
            name="positionTolerance"
            className="input"
            type="number"
            value={positionTolerance}
            data-id="positionTolerance"
            onChange={this.updateOptions}
          />
        </OptionRow>
        <OptionRow label="Angle Tolerance">
          <input
            name="angleTolerance"
            className="input"
            type="number"
            data-id="angleTolerance"
            value={angleTolerance}
            onChange={this.updateOptions}
          />
        </OptionRow>
        <OptionRow label="Keep">
          <input
            name="keep"
            className="input"
            type="number"
            data-id="keep"
            value={keep}
            onChange={this.updateOptions}
          />
        </OptionRow>

        <OptionRow label="Shape">
          <select
            name="type"
            className="input"
            data-id="type"
            onChange={this.updateOptions}
            value={shapeType}
          >
            {_.map([OBJECT_TYPE_ARROW, OBJECT_TYPE_AXES], type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </OptionRow>

        <div className="optionContainer">
          <ShapeOptions options={options} updateOptions={this.updateOptions} />
        </div>
      </React.Fragment>
    );
  }
}

export default OdometryOptions;
