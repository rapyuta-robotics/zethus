import React from 'react';

class Arrow extends React.Component {
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
      options: { alpha, shaftLength, shaftRadius, headLength, headRadius },
    } = this.props;

    return (
      <React.Fragment>
        <div>
          <div>
            Color:
            <input name="color" type="color" onChange={this.updateOptions} />
          </div>
          <div>
            alpha:
            <input
              name="alpha"
              type="number"
              value={alpha}
              onChange={this.updateOptions}
            />
          </div>
          <div>
            shaftLength:
            <input
              name="shaftLength"
              type="number"
              value={shaftLength}
              onChange={this.updateOptions}
            />
          </div>
          <div>
            shaftRadius:
            <input
              name="shaftRadius"
              type="number"
              value={shaftRadius}
              onChange={this.updateOptions}
            />
          </div>
          <div>
            HeadLength:
            <input
              name="headLength"
              type="number"
              value={headLength}
              onChange={this.updateOptions}
            />
          </div>
          <div>
            headRadius:
            <input
              name="headRadius"
              type="number"
              value={headRadius}
              onChange={this.updateOptions}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Arrow;
