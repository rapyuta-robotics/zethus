import React from 'react';

class Axes extends React.Component {
  constructor(props) {
    super(props);
    this.updateOptions = this.updateOptions.bind(this);
  }

  updateOptions(e) {
    const { updateOptions } = this.props;
    updateOptions(e);
  }

  render() {
    const {
      options: { axesLength, axesRadius },
    } = this.props;

    return (
      <React.Fragment>
        <div className="option-section">
          <span>axesLength:</span>
          <input
            name="axesLength"
            type="number"
            value={axesLength}
            onChange={this.updateOptions}
          />
        </div>
        <div className="option-section">
          <span>axesRadius:</span>
          <input
            name="axesRadius"
            type="number"
            value={axesRadius}
            onChange={this.updateOptions}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Axes;
