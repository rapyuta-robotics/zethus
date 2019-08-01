import React from 'react';
import _ from 'lodash';

import {
  DEFAULT_OPTIONS_MAP,
  MAP_COLOR_SCHEMES,
} from 'amphion/src/utils/constants';
import OptionRow from '../../../components/optionRow';
import { updateOptionsUtil } from '../../../utils';

class MapOptions extends React.Component {
  constructor(props) {
    super(props);
    this.updateOptions = updateOptionsUtil.bind(this);
  }

  render() {
    const { options: propsOptions } = this.props;
    const options = {
      ...DEFAULT_OPTIONS_MAP,
      ...propsOptions,
    };
    const { alpha, colorScheme, drawBehind } = options;
    return (
      <React.Fragment>
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
        <OptionRow label="Color Scheme">
          <select
            name="colorScheme"
            data-id="colorScheme"
            className="input"
            onChange={this.updateOptions}
            value={colorScheme}
          >
            {_.map(MAP_COLOR_SCHEMES, scheme => {
              return (
                <option key={scheme} value={scheme}>
                  {scheme}
                </option>
              );
            })}
          </select>
        </OptionRow>
        <OptionRow label="Draw Behind">
          <input
            type="checkbox"
            name="drawBehind"
            className="input"
            data-id="drawBehind"
            value={drawBehind}
            onChange={this.updateOptions}
          />
        </OptionRow>
      </React.Fragment>
    );
  }
}

export default MapOptions;
