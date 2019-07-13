import React from 'react';
import _ from 'lodash';

import { ROS_SOCKET_STATUSES } from '../../utils';
import VizListItem from '../../components/vizListItem';
import GlobalOptions from './globalOptions';
import ConnectionDot from '../../components/connectionDot';

import '../../styles/sidebar.scss';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rosEndpoint: localStorage.getItem('endpoint') || '',
    };
    this.onRosSubmit = this.onRosSubmit.bind(this);
    this.updateRosEndpoint = this.updateRosEndpoint.bind(this);
    this.removeDisplayType = this.removeDisplayType.bind(this);
  }

  onRosSubmit(e) {
    e.preventDefault();
    const { rosEndpoint } = this.state;
    const { connectRos, disconnectRos, rosStatus } = this.props;

    switch (rosStatus) {
      case ROS_SOCKET_STATUSES.CONNECTED:
      case ROS_SOCKET_STATUSES.CONNECTING:
        disconnectRos();
        break;
      case ROS_SOCKET_STATUSES.INITIAL:
      case ROS_SOCKET_STATUSES.CONNECTION_ERROR:
        connectRos(rosEndpoint);
        break;
      default:
    }
    localStorage.setItem('endpoint', rosEndpoint);
  }

  componentDidMount() {
    this.onRosSubmit({ preventDefault: () => {} });
  }

  updateRosEndpoint(e) {
    this.setState({
      rosEndpoint: e.target.value,
    });
  }

  removeDisplayType(id) {
    const { removeDisplayType } = this.props;
    removeDisplayType(id);
  }

  disableEndpointInput() {
    const { rosStatus } = this.props;
    return _.includes(
      [ROS_SOCKET_STATUSES.CONNECTED, ROS_SOCKET_STATUSES.CONNECTING],
      rosStatus,
    );
  }

  render() {
    const {
      viewer,
      updateTopic,
      updateOptions,
      ros,
      rosTopics,
      rosStatus,
      visualizations,
      toggleAddModal,
      updateVisibilty,
    } = this.props;

    const { rosEndpoint } = this.state;
    return (
      <div id="sidebar">
        <div className="container">
          <img draggable={false} id="logo" src="./logo.svg" alt="Zethus" />
        </div>
        <hr className="separator" />
        <div className="container">
          <div id="rosStatus" className="flex">
            <ConnectionDot status={rosStatus} />
            <span>{rosStatus}</span>
          </div>
          <form onSubmit={this.onRosSubmit}>
            <div className="inputLabel">ROS Endpoint</div>
            <div className="flex">
              <input
                type="text"
                className="input"
                value={rosEndpoint}
                onChange={this.updateRosEndpoint}
                disabled={this.disableEndpointInput()}
              />
              <div className="flexSpace" />
              <button className="btn-primary" type="submit">
                {rosStatus === ROS_SOCKET_STATUSES.CONNECTED
                  ? 'Disconnect'
                  : 'Connect'}
              </button>
            </div>
          </form>
        </div>
        <hr className="separator" />
        {rosStatus === ROS_SOCKET_STATUSES.CONNECTED && (
          <React.Fragment>
            <GlobalOptions viewer={viewer} />
            <hr className="separator" />
            <div className="container">
              <button
                type="button"
                className="btn-primary"
                onClick={toggleAddModal}
              >
                Add Visualization
              </button>
              {_.size(visualizations) === 0 && (
                <p>No visualizations added to the scene</p>
              )}
              {_.map(visualizations, viz => (
                <VizListItem
                  rosTopics={rosTopics}
                  updateTopic={updateTopic}
                  updateOptions={updateOptions}
                  updateVisibilty={updateVisibilty}
                  key={viz.id}
                  details={viz}
                  ros={ros}
                  removeDisplayType={this.removeDisplayType}
                />
              ))}
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Sidebar;
