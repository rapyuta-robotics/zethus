import React from 'react';
import _ from 'lodash';

import OptionRow from '../optionRow';

class Marker extends React.Component {
  constructor(props) {
    super(props);

    this.setNamespaces = this.setNamespaces.bind(this);
    this.updateOptions = this.updateOptions.bind(this);
    this.updateNamespace = this.updateNamespace.bind(this);

    const { rosObject } = props;
    rosObject.onNamespaceChange(this.setNamespaces);
  }

  setNamespaces() {
    const { options, updateOptions } = this.props;
    const {
      rosObject: {
        markerManager: { namespaces },
      },
    } = this.props;
    const newOptions = { ...options };

    newOptions.namespaces = namespaces;
    updateOptions(newOptions);
  }

  updateNamespace(e) {
    const {
      options: { namespaces },
    } = this.props;
    const { options } = this.props;
    const { updateOptions } = this.props;

    namespaces[e.target.name] = e.target.checked;
    let newOptions = { ...options };
    newOptions = { ...newOptions, namespaces };
    updateOptions(newOptions);
  }

  updateOptions(e) {
    const { updateOptions } = this.props;
    const { options } = this.props;
    const newOptions = { ...options };

    newOptions[e.target.name] = e.target.value;
    updateOptions(newOptions);
  }

  render() {
    const {
      options: { namespaces },
    } = this.props;

    if (_.size(_.compact(_.keys(namespaces))) === 0) {
      return null;
    }

    return (
      <React.Fragment>
        Namespaces:
        <div className="optionContainer">
          {_.map(namespaces, (checked, key) =>
            key ? (
              <OptionRow label={key}>
                <input
                  name={key}
                  type="checkbox"
                  checked={checked}
                  onChange={this.updateNamespace}
                />
              </OptionRow>
            ) : null,
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Marker;
