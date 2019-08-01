import React from 'react';
import _ from 'lodash';

import { ROS_SOCKET_STATUSES, vizOptions } from '../../utils';
import GlobalOptions from './globalOptions';
import ConnectionDot from '../../components/connectionDot';

import '../../styles/sidebar.scss';
import Logo from '../../components/logo';
import VizOptions from './vizOptions';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rosInput: props.rosEndpoint,
    };
    this.updateRosInput = this.updateRosInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  updateRosInput(e) {
    this.setState({
      rosInput: e.target.value,
    });
  }

  onSubmit(e) {
    const { updateRosEndpoint } = this.props;
    const { rosInput } = this.state;
    e.preventDefault();
    updateRosEndpoint(rosInput);
  }

  render() {
    const {
      globalOptions,
      rosStatus,
      visualizations,
      toggleAddModal,
      rosTopics,
      viewer,
      rosInstance,
      updateVizOptions,
      updateGlobalOptions,
    } = this.props;

    const { rosInput } = this.state;
    return (
      <div id="sidebar">
        <div className="container" id="logo">
          <Logo />
        </div>
        <hr className="separator" />
        <div className="container">
          <div id="rosStatus" className="flex">
            <ConnectionDot status={rosStatus} />
            <span>{rosStatus}</span>
          </div>
          <form onSubmit={this.onSubmit}>
            <div className="inputLabel">ROS Endpoint</div>
            <div className="flex">
              <input
                type="text"
                className="input"
                value={rosInput}
                onChange={this.updateRosInput}
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
            <GlobalOptions
              globalOptions={globalOptions}
              updateGlobalOptions={updateGlobalOptions}
            />
            <hr className="separator" />
            <div className="container" id="sidebarVizContainer">
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
              {_.map(visualizations, vizItem => {
                const vizObject = _.find(
                  vizOptions,
                  v => v.type === vizItem.vizType,
                );
                if (!vizObject) {
                  return null;
                }
                const topics = _.filter(rosTopics, t =>
                  _.includes(vizObject.messageTypes, t.messageType),
                );
                return (
                  <VizOptions
                    options={vizItem}
                    key={vizItem.key}
                    viewer={viewer}
                    topics={topics}
                    vizObject={vizObject}
                    rosInstance={rosInstance}
                    updateVizOptions={updateVizOptions}
                  />
                );
              })}
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Sidebar;
