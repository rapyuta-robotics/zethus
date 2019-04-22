import React from 'react';
import {
  OBJECT_TYPE_ARROW,
  OBJECT_TYPE_AXES,
  OBJECT_TYPE_FLAT_ARROW,
} from 'amphion/src/utils/constants';
import Arrow from './Arrow';
import FlatArrow from './FlatArrow';
import Axes from './Axes';

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
    }

    return <div>Something went wrong - Check Type</div>;
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
      options: { type: shapeType, unreliable },
    } = this.props;

    return (
      <React.Fragment>
        <div className="option-section">
          Unreliable:
          <input
            name="unreliable"
            type="checkbox"
            value={unreliable}
            onChange={this.updateOptions}
          />
        </div>
        <div className="option-section">
          Shape:
          <select name="type" onChange={this.changeShape} value={shapeType}>
            <option key={OBJECT_TYPE_ARROW} value={OBJECT_TYPE_ARROW}>
              {OBJECT_TYPE_ARROW}
            </option>
            <option key={OBJECT_TYPE_AXES} value={OBJECT_TYPE_AXES}>
              {OBJECT_TYPE_AXES}
            </option>

            {/*<option key={OBJECT_TYPE_FLAT_ARROW} value={OBJECT_TYPE_FLAT_ARROW}>*/}
            {/*{OBJECT_TYPE_FLAT_ARROW}*/}
            {/*</option>*/}
          </select>
        </div>
        {this.getShape()}
      </React.Fragment>
    );
  }
}

export default Pose;
