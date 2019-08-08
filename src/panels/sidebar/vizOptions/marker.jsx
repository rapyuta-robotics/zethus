import React from 'react';
import _ from 'lodash';

import { DEFAULT_OPTIONS_MARKER } from 'amphion/src/utils/constants';
import OptionRow from '../../../components/optionRow';
import { Input, OptionContainer } from '../../../components/styled';

class MarkerOptions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.updateNamespaceVisibility = this.updateNamespaceVisibility.bind(this);
  }

  updateNamespaceVisibility(e) {
    const {
      options: { key, namespaces },
      updateVizOptions,
    } = this.props;
    const {
      checked,
      dataset: { id: optionId },
    } = e.target;
    updateVizOptions(key, {
      namespaces: {
        ...namespaces,
        [optionId]: checked,
      },
    });
  }

  render() {
    const { options: propsOptions } = this.props;

    const { namespaces } = {
      ...DEFAULT_OPTIONS_MARKER,
      ...propsOptions,
    };

    if (_.size(_.compact(_.keys(namespaces))) === 0) {
      return null;
    }

    return (
      <React.Fragment>
        Namespaces:
        <OptionContainer>
          {_.map(namespaces, (checked, key) =>
            key ? (
              <OptionRow label={key}>
                <Input
                  name={key}
                  type="checkbox"
                  data-id="key"
                  checked={checked}
                  onChange={this.updateNamespaceVisibility}
                />
              </OptionRow>
            ) : null,
          )}
        </OptionContainer>
      </React.Fragment>
    );
  }
}

export default MarkerOptions;
