import React from 'react';
import Amphion from 'amphion';
import _ from 'lodash';

const statuses = {
  loading: 0,
  loaded: 1,
  error: 2,
};

class RobotModelOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.selectedViz.vizType,
      packages: {},
      status: statuses.loading,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.getPackages = this.getPackages.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updatePackage = this.updatePackage.bind(this);
  }

  componentDidMount() {
    this.getPackages();
  }

  updateName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  getPackages() {
    const {
      ros,
      selectedViz: { topicName },
    } = this.props;
    try {
      const robotInstance = new Amphion.RobotModel(ros, topicName);
      robotInstance.getPackages(packages => {
        this.setState({
          packages: _.mapValues(_.keyBy(packages), p => `/${p}`),
          status: statuses.loaded,
        });
      });
    } catch (e) {
      this.setState({
        status: statuses.error,
      });
    }
  }

  updatePackage(e) {
    const {
      value,
      dataset: { id: packageId },
    } = e.target;
    const { packages } = this.state;
    this.setState({
      packages: {
        ...packages,
        [packageId]: value,
      },
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { selectedViz, addVisualization } = this.props;
    const { packages, name } = this.state;
    addVisualization({
      ...selectedViz,
      name,
      packages,
    });
  }

  render() {
    const { status, packages, name } = this.state;
    const { back } = this.props;
    if (status === statuses.loading) {
      return <p>Loading list of packages...</p>;
    }
    if (status === statuses.error) {
      return (
        <p>
          Error occured while fetching packages. Please{' '}
          <button onClick={this.getPackages}>try again</button>
        </p>
      );
    }
    return (
      <form onSubmit={this.onSubmit}>
        <div className="inputWrapper">
          <label>Visualization name</label>
          <input className="input" value={name} onChange={this.updateName} />
        </div>
        <h4 className="typeHeading">Packages</h4>
        {_.map(packages, (path, packageName) => (
          <div className="inputWrapper" key={packageName}>
            <label>{packageName}</label>
            <input
              className="input"
              data-id={packageName}
              value={path}
              onChange={this.updatePackage}
              required
            />
          </div>
        ))}
        <div className="modal-actions">
          <div className="flexGrow" />
          <button type="submit" className="btn-primary">
            Add Robot model
          </button>
          <button type="button" className="btn-primary" onClick={back}>
            Back
          </button>
        </div>
      </form>
    );
  }
}

export default RobotModelOptions;
