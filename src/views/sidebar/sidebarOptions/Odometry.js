import React from 'react';
import {
  OBJECT_TYPE_ARROW,
  OBJECT_TYPE_AXES,
  OBJECT_TYPE_FLAT_ARROW,
} from 'amphion/src/utils/constants';
import Arrow from './ArrowOptions';
import FlatArrow from './FlatArrowOptions';
import Axes from './AxesOptions';
import OptionRow from '../optionRow';

class Odometry extends React.Component {
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
      options: { type: shapeType, positionTolerance, angleTolerance, keep },
    } = this.props;

    return (
      <React.Fragment>
        <OptionRow label="Position Tolerance">
          <input
            name="positionTolerance"
            type="number"
            value={positionTolerance}
            onChange={this.updateOptions}
          />
        </OptionRow>
        <OptionRow label="Angle Tolerance">
          <input
            name="angleTolerance"
            type="number"
            value={angleTolerance}
            onChange={this.updateOptions}
          />
        </OptionRow>
        <OptionRow label="Keep">
          <input
            name="keep"
            type="number"
            value={keep}
            onChange={this.updateOptions}
          />
        </OptionRow>

        <OptionRow label="Shape">
          <select
            name="type"
            className="input"
            onChange={this.changeShape}
            value={shapeType}
          >
            <option key={OBJECT_TYPE_ARROW} value={OBJECT_TYPE_ARROW}>
              {OBJECT_TYPE_ARROW}
            </option>
            <option key={OBJECT_TYPE_AXES} value={OBJECT_TYPE_AXES}>
              {OBJECT_TYPE_AXES}
            </option>
          </select>
        </OptionRow>

        <div className="optionContainer">{this.getShape()}</div>
      </React.Fragment>
    );
  }
}

export default Odometry;
