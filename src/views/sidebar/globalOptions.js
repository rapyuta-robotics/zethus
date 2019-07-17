import React from 'react';
import _ from 'lodash';

class GlobalOptions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      framesList: [],
      selectedFrame: '',
    };

    this.changeFrame = this.changeFrame.bind(this);
  }

  changeFrame(event) {
    const { viewer } = this.props;
    this.setState({ selectedFrame: event.target.value }, () => {
      const { selectedFrame } = this.state;
      viewer.resetFrameTransform(selectedFrame);
    });
  }

  render() {
    const { framesList, selectedFrame } = this.state;

    return (
      <div className="container">
        {framesList.length > 0 && (
          <div className="optionRow">
            <div className="halfWidth">Fixed Frame:</div>
            <div className="halfWidth">
              <select
                onChange={this.changeFrame}
                value={selectedFrame}
                className="input"
              >
                {_.map(framesList, frame => (
                  <option key={frame} value={frame}>
                    {frame}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        <div className="optionRow">
          <div className="halfWidth">Background Color:</div>
          <div className="halfWidth">#222222</div>
        </div>
        <div className="optionRow">
          <div className="halfWidth">Grid size:</div>
          <div className="halfWidth">3</div>
        </div>
      </div>
    );
  }
}

export default GlobalOptions;
