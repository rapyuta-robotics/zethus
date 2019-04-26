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
        <div className="option-section">
          <span>Color:</span>
          <span>
            <input name="color" type="color" onChange={this.updateOptions} />
          </span>
        </div>
        <div className="option-section">
          <span>alpha:</span>
          <span>
            <input
              name="alpha"
              type="number"
              value={alpha}
              onChange={this.updateOptions}
            />
          </span>
        </div>
        <div className="option-section">
          <span>shaftLength:</span>
          <span>
            <input
              name="shaftLength"
              type="number"
              value={shaftLength}
              onChange={this.updateOptions}
            />
          </span>
        </div>
        <div className="option-section">
          <span>shaftRadius:</span>
          <span>
            <input
              name="shaftRadius"
              type="number"
              value={shaftRadius}
              onChange={this.updateOptions}
            />
          </span>
        </div>
        <div className="option-section">
          <span>HeadLength:</span>
          <span>
            <input
              name="headLength"
              type="number"
              value={headLength}
              onChange={this.updateOptions}
            />
          </span>
        </div>
        <div className="option-section">
          <span>headRadius:</span>
          <span>
            <input
              name="headRadius"
              type="number"
              value={headRadius}
              onChange={this.updateOptions}
            />
          </span>
        </div>
      </React.Fragment>
    );
  }
}

export default Arrow;
