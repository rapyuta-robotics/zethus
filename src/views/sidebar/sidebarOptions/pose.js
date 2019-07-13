import React from 'react';
import _ from 'lodash';

import {
  MESSAGE_TYPE_POSESTAMPED,
  OBJECT_TYPE_ARROW,
  OBJECT_TYPE_AXES,
  OBJECT_TYPE_FLAT_ARROW,
} from 'amphion/src/utils/constants';
import Arrow from './arrow';
import FlatArrow from './flatArrow';
import Axes from './axes';
import OptionRow from '../optionRow';

class Pose extends React.Component {
  constructor(props) {
    super(props);

    this.changeShape = this.changeShape.bind(this);
    this.updateOptions = this.updateOptions.bind(this);
  }

  getShape() {
    const { options } = this.props;
    const { type: shapeType } = options;

    switch (shapeType) {
      case OBJECT_TYPE_ARROW:
        return <Arrow updateOptions={this.updateOptions} options={options} />;
      case OBJECT_TYPE_FLAT_ARROW:
        return (
          <FlatArrow updateOptions={this.updateOptions} options={options} />
        );
      case OBJECT_TYPE_AXES:
        return <Axes updateOptions={this.updateOptions} options={options} />;
      default:
        return null;
    }
  }

  changeShape(e) {
    this.updateOptions(e);
  }

  updateOptions(e) {
    const { updateOptions } = this.props;
    const { options } = this.props;
    const newOptions = { ...options };
    newOptions[e.target.name] = e.target.value;
    updateOptions(newOptions);
  }

  render() {
    const {
      options: { type: shapeType },
      rosObject: { messageType },
    } = this.props;

    const dropdownOptions = [
      OBJECT_TYPE_ARROW,
      ...(messageType !== MESSAGE_TYPE_POSESTAMPED
        ? [OBJECT_TYPE_FLAT_ARROW]
        : []),
      OBJECT_TYPE_AXES,
    ];

    return (
      <React.Fragment>
        <OptionRow label="Shape">
          <select
            name="type"
            className="input"
            onChange={this.changeShape}
            value={shapeType}
          >
            {_.map(dropdownOptions, o => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </OptionRow>
        <div className="optionContainer">{this.getShape()}</div>
      </React.Fragment>
    );
  }
}

export default Pose;
