import React from 'react';

class Marker extends React.Component {
  constructor(props) {
    super(props);

    this.setNamespaces = this.setNamespaces.bind(this);
    this.onChangeQueueSize = this.onChangeQueueSize.bind(this);
    this.updateNamespace = this.updateNamespace.bind(this);

    const { rosObject } = props;
    rosObject.setCallback(this.setNamespaces);
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

  onChangeQueueSize(e) {
    const { updateOptions } = this.props;
    const { options } = this.props;
    const newOptions = { ...options };

    newOptions[e.target.name] = e.target.value;
    updateOptions(newOptions);
  }

  render() {
    const {
      options: { unreliable, queueSize, namespaces },
    } = this.props;

    return (
      <React.Fragment>
        <div className="option-section">
          <span>Unreliable:</span>
          <input
            name="unreliable"
            type="checkbox"
            value={unreliable}
            onChange={this.updateOptions}
          />
        </div>
        <div className="option-section">
          <span>Queue Size:</span>
          <input
            name="queueSize"
            type="input"
            value={queueSize}
            onChange={this.onChangeQueueSize}
          />
        </div>
        Namespaces:
        <div className="sub-section">
          {Object.keys(namespaces).map(key => {
            return (
              <div className="option-section" key={key}>
                <span>{key}</span>
                <span>
                  <input
                    name={key}
                    type="checkbox"
                    checked={namespaces[key]}
                    onChange={this.updateNamespace}
                  />
                </span>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default Marker;
