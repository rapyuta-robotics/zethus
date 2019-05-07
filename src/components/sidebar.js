import React from 'react';
import _ from 'lodash';

import { ROS_SOCKET_STATUSES } from '../utils';
import VizListItem from './vizListItem';
import GlobalOptions from './globalOptions';

export const CONNECTION_DOT_CLASSES = {
  [ROS_SOCKET_STATUSES.INITIAL]: 'initial',
  [ROS_SOCKET_STATUSES.CONNECTING]: 'connecting',
  [ROS_SOCKET_STATUSES.CONNECTED]: 'connected',
  [ROS_SOCKET_STATUSES.CONNECTION_ERROR]: 'error',
};

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rosEndpoint:
        localStorage.getItem('endpoint') ||
        'wss://inst-fwdtohjiuvobyarnyctgkklb-fwwqpy.apps.rapyuta.io:9090',
    };
    this.onRosSubmit = this.onRosSubmit.bind(this);
    this.updateRosEndpoint = this.updateRosEndpoint.bind(this);
    this.removeDisplayType = this.removeDisplayType.bind(this);

    this.nav2DBtnBlur = this.nav2DBtnBlur.bind(this);
    this.navGoal2DClicked = this.navGoal2DClicked.bind(this);
    this.navEstimate2DClicked = this.navEstimate2DClicked.bind(this);
  }

  onRosSubmit(e) {
    e.preventDefault();
    const { rosEndpoint } = this.state;
    const { connectRos, disconnectRos, rosStatus } = this.props;

    if (
      rosStatus === ROS_SOCKET_STATUSES.CONNECTED ||
      rosStatus === ROS_SOCKET_STATUSES.CONNECTING
    ) {
      disconnectRos();
    } else if (
      _.includes(
        [ROS_SOCKET_STATUSES.INITIAL, ROS_SOCKET_STATUSES.CONNECTION_ERROR],
        rosStatus,
      )
    ) {
      connectRos(rosEndpoint);
    }

    localStorage.setItem('endpoint', rosEndpoint);
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

  navGoal2DClicked() {
    // disable editor controls and publish the topic /goal
    const { toggleEditorControls } = this.props;
    toggleEditorControls(false, '/move_base_simple/goal');
  }

  navEstimate2DClicked() {
    // disable editor controls and publish the topic /initialpose
    const { toggleEditorControls } = this.props;
    toggleEditorControls(false, 'initialpose');
  }

  nav2DBtnBlur() {
    // enable the editor controls here.
    const { toggleEditorControls } = this.props;
    toggleEditorControls(true);
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
      vizWrapper,
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
        <div className="sidebar-display">
          <div id="logo-wrapper">
            <img draggable={false} id="logo" src="./logo.svg" alt="Zethus" />
          </div>
          <div id="ros-input-section">
            <div id="ros-status">
              <span
                id="ros-status-dot"
                className={CONNECTION_DOT_CLASSES[rosStatus]}
              />
              <span id="ros-status-text">{rosStatus}</span>
            </div>
            <form id="ros-input-flex" onSubmit={this.onRosSubmit}>
              <input
                type="text"
                id="ros-input"
                value={rosEndpoint}
                onChange={this.updateRosEndpoint}
                disabled={this.disableEndpointInput()}
              />
              <button
                id="ros-connect-button"
                className="btn-primary"
                type="submit"
              >
                {this.disableEndpointInput() ? 'Disconnect' : 'Connect'}
              </button>
            </form>
          </div>
          <GlobalOptions vizWrapper={vizWrapper} ros={ros} />
          {rosStatus === ROS_SOCKET_STATUSES.CONNECTED && (
            <div id="visualzation-list">
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
          )}
        </div>
        {/* <div className="sidebar-bottom-btn" onBlur={this.nav2DBtnBlur}> */}
        {/* <button */}
        {/* type="button" */}
        {/* className="btn-primary" */}
        {/* onClick={this.navGoal2DClicked} */}
        {/* > */}
        {/* 2D Nav Goal */}
        {/* </button> */}
        {/* <button */}
        {/* type="button" */}
        {/* className="btn-primary" */}
        {/* onClick={this.navEstimate2DClicked} */}
        {/* > */}
        {/* 2D Nav Estimate */}
        {/* </button> */}
        {/* </div> */}
      </div>
    );
  }
}

export default Sidebar;
