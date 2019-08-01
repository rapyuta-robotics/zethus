import React from 'react';
import OptionRow from '../../components/optionRow';

class GlobalOptions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.updateOptions = this.updateOptions.bind(this);
  }

  updateOptions(e) {
    const { updateGlobalOptions } = this.props;
    const {
      value,
      dataset: { id: optionId },
    } = e.target;
    updateGlobalOptions(optionId, value);
  }

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
          <OptionRow label="Background Color">
            <div className="optionRow">
              <input
                type="color"
                data-id="backgroundColor.value"
                className="input"
                value={valueBackgroundColor}
                onChange={this.updateOptions}
              />
            </div>
          </OptionRow>
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
