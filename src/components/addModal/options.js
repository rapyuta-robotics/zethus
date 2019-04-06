import React from 'react';
import _ from 'lodash';
import shortid from 'shortid';

import { MESSAGE_TYPE_ROBOT_MODEL } from 'amphion/src/utils/constants';

const stopPropagation = e => e.stopPropagation();

const getOptionsForMessageType = messageType => {
  switch (messageType) {
    case MESSAGE_TYPE_ROBOT_MODEL:
      return {
        paramName: 'robot_description',
        packages: [
          {
            name: 'hitachi_forklift_description',
            value:
              'https://storage.googleapis.com/kompose-artifacts/hitachi_forklift_description',
            key: shortid.generate(),
          },
        ],
      };
    default:
      return {};
  }
};

const getDefaultArrayItem = (type, defaultValue) => {
  switch (type) {
    case 'robot_model_package':
      return {
        key: shortid.generate(),
        name: '',
        value: '',
      };
    default:
      return null;
  }
};

class SelectedVizOptionsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: getOptionsForMessageType(props.selectedViz.messageTypes[0]),
    };
    this.updateValue = this.updateValue.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  updateValue(updateKey, value) {
    const { options } = this.state;
    const tempOptions = {
      ...options,
    };

    _.set(tempOptions, updateKey, value);

    this.setState({
      options: tempOptions,
    });
  }

  handleAdd(e, arrayKey, typeKey, defaultValue) {
    if (e) e.preventDefault();
    const tempData = getDefaultArrayItem(typeKey, defaultValue);
    const tempOptions = {
      ...this.state.options,
    };
    let tempArray = _.get(tempOptions, arrayKey);
    tempArray = [tempData, ...tempArray];
    _.set(tempOptions, arrayKey, tempArray);
    this.setState({
      options: tempOptions,
    });
  }

  handleRemove(e, arrayKey, removeKey) {
    e.preventDefault();
    const tempOptions = {
      ...this.state.options,
    };
    const tempArray = _.get(tempOptions, arrayKey);
    _.remove(tempArray, i => i.key === removeKey);
    _.set(tempOptions, arrayKey, tempArray);
    this.setState({
      options: tempOptions,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const {
      addVisualization,
      selectedViz: { messageTypes, isDisplay, name },
    } = this.props;
    const { options } = this.state;
    addVisualization(messageTypes, isDisplay, name, options);
  }

  render() {
    const {
      selectedViz: {
        messageTypes: [type],
      },
      toggleOptionsForm,
    } = this.props;
    const { options } = this.state;
    if (type === MESSAGE_TYPE_ROBOT_MODEL) {
      return (
        <form
          className="modal-contents"
          onClick={stopPropagation}
          onSubmit={this.onSubmit}
        >
          <h2 className="modal-title">Add options for Robot Model</h2>
          <div className="type-container">
            <div>
              <h4>Parameter name</h4>
              <input
                type="text"
                value={options.paramName}
                onChange={e => this.updateValue('paramName', e.target.value)}
              />

              <h4>
                Packages
                <button
                  type="button"
                  onClick={e =>
                    this.handleAdd(e, 'packages', 'robot_model_package')
                  }
                >
                  Add package
                </button>
              </h4>
              {_.map(options.packages, ({ key, name, value }, index) => (
                <div key={key} className="inputWrapper">
                  <input
                    type="text"
                    value={name}
                    onChange={e =>
                      this.updateValue(
                        `packages[${index}].name`,
                        e.target.value,
                      )
                    }
                    required
                    placeholder="Package name"
                  />{' '}
                  :{' '}
                  <input
                    type="text"
                    value={value}
                    onChange={e =>
                      this.updateValue(
                        `packages[${index}].value`,
                        e.target.value,
                      )
                    }
                    required
                    placeholder="URL to package description"
                  />
                  <button
                    type="button"
                    onClick={e => this.handleRemove(e, `packages`, key)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              {_.size(options.packages) === 0 && <p>No packages added</p>}
            </div>
          </div>
          <div className="modal-actions">
            <div className="flex-gap" />
            <button type="submit" className="btn-primary">
              Add Visualization
            </button>
            <button
              type="button"
              className="btn-primary"
              onClick={toggleOptionsForm}
            >
              Back
            </button>
          </div>
        </form>
      );
    }
    return null;
  }
}

export default SelectedVizOptionsForm;
