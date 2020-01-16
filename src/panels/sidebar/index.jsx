import React from 'react';
import _ from 'lodash';

import { ROS_SOCKET_STATUSES } from '../../utils';
import { vizOptions } from '../../utils/vizOptions';
import GlobalOptions from './globalOptions';
import {
  ButtonPrimary,
  Container,
  Flex,
  FlexSpace,
  HiddenInput,
  Input,
  InputLabel,
  RosbagDisplay,
  Separator,
  StyledSidebar,
} from '../../components/styled';
import ConnectionDot from '../../components/connectionDot';
import RosReconnectHandler from './rosReconnectHandler';
import VizOptions from './vizOptions';
import { RosStatus, SidebarVizContainer } from '../../components/styled/viz';
import { rosbagBucket } from '../sources';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rosInput: props.rosEndpoint,
      files: [],
    };
    this.fileBagProgressRefMap = {};
    this.fileBagGlobalReadersMap = {};
    this.updateRosInput = this.updateRosInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleUploadRosbag = this.handleUploadRosbag.bind(this);
    this.rosbagUploadRef = React.createRef();
  }

  updateRosInput(e) {
    this.setState({
      rosInput: e.target.value,
    });
  }

  handleUploadRosbag(event) {
    const { refreshRosData } = this.props;
    const { files: filesFromState } = this.state;
    const files = [...event.target.files];
    const refreshedRosDataOnceFlag = {};
    if (this.fileBagGlobalReadersMap[files[0].name]) {
      return;
    }
    const reader = (file, result) => {
      if (!refreshedRosDataOnceFlag[file.name]) {
        refreshRosData();
        refreshedRosDataOnceFlag[file.name] = true;
      }
      const { chunkOffset, totalChunks } = result;
      const progressEl = this.fileBagProgressRefMap[file.name].current;
      progressEl.value = Math.floor((chunkOffset * 100) / totalChunks);
    };
    this.fileBagGlobalReadersMap[files[0].name] = reader;
    rosbagBucket.addReader('*', reader);
    files.forEach(file => {
      this.fileBagProgressRefMap[file.name] = React.createRef();
      rosbagBucket.addFile(file);
    });
    this.setState({ files: [...filesFromState, ...files] });
  }

  onSubmit(e) {
    const {
      connectRos,
      disconnectRos,
      rosEndpoint,
      rosStatus,
      updateRosEndpoint,
    } = this.props;
    const { files, rosInput } = this.state;
    e.preventDefault();
    if (rosInput !== rosEndpoint) {
      updateRosEndpoint(rosInput);
    } else if (
      _.includes(
        [ROS_SOCKET_STATUSES.CONNECTED, ROS_SOCKET_STATUSES.CONNECTING],
        rosStatus,
      )
    ) {
      disconnectRos();
    } else {
      connectRos();
    }
  }

  render() {
    const {
      connectRos,
      framesList,
      globalOptions,
      removeVisualization,
      rosInstance,
      rosStatus,
      rosTopics,
      toggleAddModal,
      toggleConfigurationModal,
      toggleVisibility,
      updateGlobalOptions,
      updateVizOptions,
      viewer,
      visualizations,
    } = this.props;

    const { files, rosInput } = this.state;
    return (
      <StyledSidebar>
        <Container>
          <RosStatus>
            <ConnectionDot status={rosStatus} />
            <span>
              {rosStatus}.{' '}
              <RosReconnectHandler
                connectRos={connectRos}
                rosStatus={rosStatus}
              />
            </span>
          </RosStatus>
          <form onSubmit={this.onSubmit}>
            <InputLabel>ROS Endpoint</InputLabel>
            <Flex>
              <Input
                type="text"
                value={rosInput}
                onChange={this.updateRosInput}
              />
              <FlexSpace />
              <ButtonPrimary type="submit">
                {_.includes(
                  [
                    ROS_SOCKET_STATUSES.CONNECTED,
                    ROS_SOCKET_STATUSES.CONNECTING,
                  ],
                  rosStatus,
                )
                  ? 'Disconnect'
                  : 'Connect'}
              </ButtonPrimary>
            </Flex>
          </form>
        </Container>
        <Separator />
        {rosStatus === ROS_SOCKET_STATUSES.CONNECTED && (
          <>
            <GlobalOptions
              framesList={framesList}
              globalOptions={globalOptions}
              updateGlobalOptions={updateGlobalOptions}
              toggleConfigurationModal={toggleConfigurationModal}
            />
            <Separator />
            <SidebarVizContainer>
              <ButtonPrimary type="button" onClick={toggleAddModal}>
                Add Visualization
              </ButtonPrimary>
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
                const relatedTopics = _.filter(rosTopics, t =>
                  _.includes(vizObject.additionalMessageTypes, t.messageType),
                );
                return (
                  <VizOptions
                    options={vizItem}
                    key={vizItem.key}
                    viewer={viewer}
                    topics={topics}
                    relatedTopics={relatedTopics}
                    vizObject={vizObject}
                    rosInstance={rosInstance}
                    updateVizOptions={updateVizOptions}
                    removeVisualization={removeVisualization}
                    toggleVisibility={toggleVisibility}
                  />
                );
              })}
            </SidebarVizContainer>
            <Separator />
            <SidebarVizContainer>
              <ButtonPrimary
                type="button"
                onClick={() => {
                  this.rosbagUploadRef.current.click();
                }}
              >
                Add rosbag
                <HiddenInput
                  ref={this.rosbagUploadRef}
                  onChange={this.handleUploadRosbag}
                  id="rosbag-upload"
                  type="file"
                  name="rosbags"
                  accept=".bag"
                />
              </ButtonPrimary>
              {_.size(files) === 0 && <p>No rosbags added</p>}
              {_.map(files, (file, index) => (
                <RosbagDisplay key={index}>
                  <span>{file.name}</span>
                  <progress
                    id={`progress-${file.name}`}
                    ref={this.fileBagProgressRefMap[file.name]}
                    value="0"
                    max="100"
                  />
                </RosbagDisplay>
              ))}
            </SidebarVizContainer>
          </>
        )}
      </StyledSidebar>
    );
  }
}

export default Sidebar;
