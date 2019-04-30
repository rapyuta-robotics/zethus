import React from 'react';
import {
  OBJECT_TYPE_ARROW,
  OBJECT_TYPE_AXES,
  OBJECT_TYPE_FLAT_ARROW,
} from 'amphion/src/utils/constants';
import Arrow from './ArrowOptions';
import FlatArrow from './FlatArrowOptions';
import Axes from './AxesOptions';

class DisplayOdometry extends React.Component {
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
      options: {
        type: shapeType,
        unreliable,
        positionTolerance,
        angleTolerance,
        keep,
      },
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
          <span>Position Tolerance:</span>
          <input
            name="positionTolerance"
            type="number"
            value={positionTolerance}
            onChange={this.updateOptions}
          />
        </div>
        <div className="option-section">
          <span>Angle Tolerance:</span>
          <input
            name="angleTolerance"
            type="number"
            value={angleTolerance}
            onChange={this.updateOptions}
          />
        </div>
        <div className="option-section">
          <span>Keep:</span>
          <input
            name="keep"
            type="number"
            value={keep}
            onChange={this.updateOptions}
          />
        </div>
        <div className="option-section">
          <span>Shape:</span>
          <select name="type" onChange={this.changeShape} value={shapeType}>
            <option key={OBJECT_TYPE_ARROW} value={OBJECT_TYPE_ARROW}>
              {OBJECT_TYPE_ARROW}
            </option>
            <option key={OBJECT_TYPE_AXES} value={OBJECT_TYPE_AXES}>
              {OBJECT_TYPE_AXES}
            </option>
          </select>
        </div>
        <div className="sub-section">{this.getShape()}</div>
      </React.Fragment>
    );
  }
}

export default DisplayOdometry;
