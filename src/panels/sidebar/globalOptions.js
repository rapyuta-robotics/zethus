import React from 'react';

class GlobalOptions extends React.Component {
  render() {
    const {
      globalOptions: {
        display: displayOptions,
        backgroundColor: {
          display: displayBackgroundColor,
          value: valueBackgroundColor,
        },
        fixedFrame: { display: displayFixedFrame, value: valueFixedFrame },
        grid: { display: displayGrid, size: valueGrid },
      },
    } = this.props;
    if (!displayOptions) {
      return null;
    }
    return (
      <div className="container">
        {displayBackgroundColor && (
          <div className="optionRow">
            <div className="halfWidth">Background Color:</div>
            <div className="halfWidth">{valueBackgroundColor.join(',')}</div>
          </div>
        )}
        {displayGrid && (
          <div className="optionRow">
            <div className="halfWidth">Grid size:</div>
            <div className="halfWidth">{valueGrid}</div>
          </div>
        )}
        {displayFixedFrame && (
          <div className="optionRow">
            <div className="halfWidth">Fixed Frame:</div>
            <div className="halfWidth">
              <select
                value={valueFixedFrame}
                className="input"
                onChange={() => {}}
              >
                <option value={valueFixedFrame}>{valueFixedFrame}</option>
              </select>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default GlobalOptions;
