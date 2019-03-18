import React from 'react';
import MapTypes from './displayTypes/mapTypes';

class SelectedDisplayTypes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayTypesSelected: [
        {
          type: 'POSE'
        }
      ],
      showModal: false
    };

    const { scene, ros } = props;
    this.scene = scene;
    this.ros = ros;

    this.toggleModal = this.toggleModal.bind(this);
  }

  getType(type, index) {
    return MapTypes(type, this.scene, index, this.ros);
  }

  toggleModal() {
    const { openModal } = this.state;
    this.state.setState({
      openModal: !openModal
    });
  }

  render() {
    const { showModal } = this.state;
    const { displayTypesSelected: selectedTypes } = this.state;

    return (
      <React.Fragment>
        <div className="display-type-section">
          <button type="button" className="btn-primary" onClick={this.toggleModal}> Add Visualization</button>
          <div className="type-section">
            { selectedTypes.map((data, index) => this.getType(data.type, index, this.ros)) }
          </div>
        </div>
        {showModal && (
          <div>
            <h1>Testing Modal</h1>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default SelectedDisplayTypes;
