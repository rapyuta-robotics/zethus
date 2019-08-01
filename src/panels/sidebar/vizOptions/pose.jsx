import React from 'react';
import _ from 'lodash';

import {
  DEFAULT_OPTIONS_POSE,
  OBJECT_TYPE_ARROW,
  OBJECT_TYPE_AXES,
  OBJECT_TYPE_FLAT_ARROW,
  VIZ_TYPE_POSE,
  VIZ_TYPE_POSEARRAY,
} from 'amphion/src/utils/constants';
import OptionRow from '../../../components/optionRow';
import ShapeOptions from './shape';
import { updateOptionsUtil } from '../../../utils';

const dropdownOptions = {
  [VIZ_TYPE_POSE]: [OBJECT_TYPE_ARROW, OBJECT_TYPE_AXES],
  [VIZ_TYPE_POSEARRAY]: [
    OBJECT_TYPE_ARROW,
    OBJECT_TYPE_AXES,
    OBJECT_TYPE_FLAT_ARROW,
  ],
};

class PoseOptions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.updateOptions = updateOptionsUtil.bind(this);
  }

  render() {
    const { options: propsOptions } = this.props;
    const options = {
      ...DEFAULT_OPTIONS_POSE,
      ...propsOptions,
    };
    const { type: shapeType, vizType } = options;

    return (
      <React.Fragment>
        <OptionRow label="Shape">
          <select
            name="type"
            className="input"
            data-id="type"
            onChange={this.updateOptions}
            value={shapeType}
          >
            {_.map(dropdownOptions[vizType], o => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </OptionRow>
        <div className="optionContainer">
          {
            <ShapeOptions
              options={options}
              updateOptions={this.updateOptions}
            />
          }
        </div>
      </React.Fragment>
    );
  }
}

export default PoseOptions;
