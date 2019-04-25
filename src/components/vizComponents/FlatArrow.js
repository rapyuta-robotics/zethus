import React from 'react';

class FlatArrow extends React.Component {
  constructor(props) {
    super(props);
    this.updateOptions = this.updateOptions.bind(this);
  }

  updateOptions(e) {
    const { updateOptions } = this.props;
    updateOptions(e);
  }

  render() {
    console.log(this.props);
    const {
      options: { alpha, arrowLength },
    } = this.props;

    return (
      <React.Fragment>
        <div className="option-section">
          <span>Color:</span>
          <input name="color" type="color" onChange={this.updateOptions} />
        </div>
        <div className="option-section">
          <span>alpha:</span>
          <input
            name="alpha"
            type="number"
            value={alpha}
            onChange={this.updateOptions}
          />
        </div>
        <div className="option-section">
          <span>Arrow Length:</span>
          <input
            name="arrowLength"
            type="number"
            value={arrowLength}
            onChange={this.updateOptions}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default FlatArrow;
