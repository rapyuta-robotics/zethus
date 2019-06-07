import React from 'react';

class Image extends React.Component {
  constructor(props) {
    super(props);

    this.updateCheckbox = this.updateCheckbox.bind(this);
    this.updateOptions = this.updateOptions.bind(this);
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

  render() {
    // const {
    //   options: { unreliable, queueSize },
    // } = this.props;

    return (
      <React.Fragment>
        {/*<div className="option-section">*/}
        {/*<span>Unreliable:</span>*/}
        {/*<span>*/}
        {/*<input*/}
        {/*name="unreliable"*/}
        {/*type="checkbox"*/}
        {/*value={unreliable}*/}
        {/*onChange={this.updateCheckbox}*/}
        {/*/>*/}
        {/*</span>*/}
        {/*</div>*/}
        {/*<div className="option-section">*/}
        {/*<span>Queue Size:</span>*/}
        {/*<span>*/}
        {/*<input*/}
        {/*name="queueSize"*/}
        {/*type="input"*/}
        {/*value={queueSize}*/}
        {/*onChange={this.updateOptions}*/}
        {/*/>*/}
        {/*</span>*/}
        {/*</div>*/}
      </React.Fragment>
    );
  }
}

export default Image;
