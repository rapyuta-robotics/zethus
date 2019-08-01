import React from 'react';
import OptionRow from '../../../components/optionRow';
import { updateOptionsUtil } from '../../../utils';
import { DEFAULT_OPTIONS_PATH } from 'amphion/src/utils/constants';

class PathOptions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.updateOptions = updateOptionsUtil.bind(this);
  }

  render() {
    const { options: propsOptions } = this.props;
    const { color, alpha } = {
      ...DEFAULT_OPTIONS_PATH,
      ...propsOptions,
    };
    return (
      <React.Fragment>
        <OptionRow label="Color">
          <input
            type="color"
            name="color"
            data-id="color"
            className="input"
            value={color}
            onChange={this.updateOptions}
          />
        </OptionRow>
        <OptionRow label="Alpha">
          <input
            type="number"
            name="alpha"
            data-id="alpha"
            className="input"
            value={alpha}
            onChange={this.updateOptions}
          />
        </OptionRow>
      </React.Fragment>
    );
  }
}

export default PathOptions;
