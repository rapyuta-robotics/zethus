import React from 'react';
import {
  OBJECT_TYPE_ARROW,
  OBJECT_TYPE_AXES,
} from 'amphion/src/utils/constants';
import Arrow from './arrow';
import Axes from './axes';
import OptionRow from '../optionRow';

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
      options: { color, alpha },
    } = this.props;
    return (
      <React.Fragment>
        <OptionRow label="Color">
          <input
            type="color"
            name="color"
            className="input"
            value={color}
            onChange={this.updateOptions}
          />
        </OptionRow>

        <OptionRow label="Alpha">
          <input
            type="number"
            name="alpha"
            className="input"
            value={alpha}
            onChange={this.updateOptions}
          />
        </OptionRow>
      </React.Fragment>
    );
  }
}

export default Path;
