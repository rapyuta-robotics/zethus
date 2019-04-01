import React from 'react';

class VizListItem extends React.Component {
  constructor(props) {
    super(props);

    const {
      details: { type },
    } = this.props;
    this.state = {
      type,
      topicTypes: [],
    };
    this.changeTopic = this.changeTopic.bind(this);
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
    const {
      details: { type },
    } = this.props;
    this.props.ros.getTopicsForType(type, data => {
      this.setState({
        topicTypes: [...data],
        hidden: false,
      });
    });
  }

  changeTopic(event) {
    const selectedTopic = event.target.value;
    const {
      details: { rosObject },
    } = this.props;
    rosObject.changeTopic(selectedTopic);
  }

  delete() {
    const {
      details: { id },
    } = this.props;
    const { removeDisplayType } = this.props;

    removeDisplayType(id);
  }

  hide() {
    const {
      details: { rosObject },
    } = this.props;
    const { hidden } = this.state;

    this.setState({ hidden: true });
    rosObject.hide();
  }

  show() {
    const {
      details: { rosObject },
    } = this.props;
    const { hidden } = this.state;

    this.setState({ hidden: false });
    rosObject.show();
  }

  render() {
    const {
      details: { displayName },
    } = this.props;
    const { topicTypes, hidden } = this.state;

    return (
      <div className="dislay-type-form-wrapper">
        <div className="display-type-form-header">
          <span className="type-image" />
          {displayName}
        </div>
        <div className="display-type-form-content">
          Topic:
          <select onChange={this.changeTopic}>
            {topicTypes.map(topic => (
              <option>{topic}</option>
            ))}
          </select>
        </div>
        <div className="display-type-form-button-section">
          <button type="button" onClick={this.delete}>
            <i className="fa fa-trash" aria-hidden="true" />
            Delete
          </button>

          {!hidden ? (
            <button type="button" onClick={this.hide}>
              <i className="fa fa-eye-slash" aria-hidden="true" />
              Hide
            </button>
          ) : (
            <button type="button" onClick={this.show}>
              <i className="fa fa-eye" aria-hidden="true" />
              Show
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default VizListItem;
