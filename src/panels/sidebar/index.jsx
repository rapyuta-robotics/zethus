import React from 'react';
import _ from 'lodash';

import { ROS_SOCKET_STATUSES, vizOptions } from '../../utils';
import GlobalOptions from './globalOptions';
import {
  ButtonPrimary,
  Container,
  Input,
  InputLabel,
  Separator,
  FlexSpace,
  Flex,
  StyledSidebar,
  StyledLogo,
} from '../../components/styled';
import ConnectionDot from '../../components/connectionDot';

import Logo from '../../components/logo';
import VizOptions from './vizOptions';
import { RosStatus, SidebarVizContainer } from '../../components/styled/viz';

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
      framesList,
      globalOptions,
      rosStatus,
      visualizations,
      toggleAddModal,
      rosTopics,
      viewer,
      rosInstance,
      updateVizOptions,
      updateGlobalOptions,
      removeVisualization,
      toggleVisibility,
    } = this.props;

    const { rosInput } = this.state;
    return (
      <StyledSidebar>
        <StyledLogo>
          <Logo />
        </StyledLogo>
        <Separator />
        <Container>
          <RosStatus>
            <ConnectionDot status={rosStatus} />
            <span>{rosStatus}</span>
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
                {rosStatus === ROS_SOCKET_STATUSES.CONNECTED
                  ? 'Disconnect'
                  : 'Connect'}
              </ButtonPrimary>
            </Flex>
          </form>
        </Container>
        <Separator />
        {rosStatus === ROS_SOCKET_STATUSES.CONNECTED && (
          <React.Fragment>
            <GlobalOptions
              framesList={framesList}
              globalOptions={globalOptions}
              updateGlobalOptions={updateGlobalOptions}
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
                return (
                  <VizOptions
                    options={vizItem}
                    key={vizItem.key}
                    viewer={viewer}
                    topics={topics}
                    vizObject={vizObject}
                    rosInstance={rosInstance}
                    updateVizOptions={updateVizOptions}
                    removeVisualization={removeVisualization}
                    toggleVisibility={toggleVisibility}
                  />
                );
              })}
            </SidebarVizContainer>
          </React.Fragment>
        )}
      </StyledSidebar>
    );
  }
}

export default Sidebar;
