import React from 'react';

class GenericOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.selectedViz.vizType,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.updateName = this.updateName.bind(this);
  }

  updateName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { selectedViz, addVisualization } = this.props;
    const { name } = this.state;
    addVisualization({
      ...selectedViz,
      name,
    });
  }

  render() {
    const { name } = this.state;
    const { back } = this.props;
    return (
      <form onSubmit={this.onSubmit}>
        <div className="inputWrapper">
          <label>Visualization name</label>
          <input className="input" value={name} onChange={this.updateName} />
        </div>

        <div className="modal-actions">
          <div className="flexGrow" />
          <button type="submit" className="btn-primary">
            Add visualization
          </button>
          <button type="button" className="btn-primary" onClick={back}>
            Back
          </button>
        </div>
      </form>
    );
  }
}

export default GenericOptions;
