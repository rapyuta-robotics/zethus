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
        <div>
          <div>
            shaftLength:
            <input
              name="axesLength"
              type="number"
              value={axesLength}
              onChange={this.updateOptions}
            />
          </div>
          <div>
            shaftRadius:
            <input
              name="axesRadius"
              type="number"
              value={axesRadius}
              onChange={this.updateOptions}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Axes;
