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
            Arrow Length:
            <input
              name="arrowLength"
              type="number"
              value={arrowLength}
              onChange={this.updateOptions}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FlatArrow;
