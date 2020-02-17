import React from 'react';
import { keys, map } from 'lodash';
import { VizItem, VizItemCollapse } from '../../../components/styled/viz';
import Chevron from '../../../components/chevron';
import { Input, StyledOptionRow } from '../../../components/styled';
import OptionRow from '../../../components/optionRow';

class RobotModelLinksJoints extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      linksCollapsed: true,
      jointsCollapsed: true,
    };

    this.toggleCollapsed = this.toggleCollapsed.bind(this);
  }

  toggleCollapsed(name) {
    // eslint-disable-next-line react/destructuring-assignment
    const current = this.state[name];
    this.setState({ [name]: !current });
  }

  render() {
    const { jointsCollapsed, linksCollapsed } = this.state;
    const { vizInstance } = this.props;

    if (!vizInstance[0]) {
      return null;
    }

    const { urdfObject } = vizInstance[0];
    const { joints, links } = urdfObject;

    return (
      <>
        <VizItem>
          <StyledOptionRow>
            <VizItemCollapse
              collapsed={linksCollapsed}
              onClick={() => this.toggleCollapsed('linksCollapsed')}
            >
              <Chevron />
            </VizItemCollapse>
            Links
          </StyledOptionRow>
          {!linksCollapsed &&
            links &&
            map(keys(links), (name, index) => {
              const link = links[name];
              return (
                <OptionRow key={index} label={name}>
                  <Input
                    type="checkbox"
                    name={name}
                    data-id={name}
                    defaultChecked
                    onChange={e => {
                      const { checked } = e.target;
                      if (checked) {
                        link.show();
                      } else {
                        link.hide();
                      }
                    }}
                  />
                </OptionRow>
              );
            })}
        </VizItem>
        <StyledOptionRow>
          <VizItemCollapse
            collapsed={jointsCollapsed}
            onClick={() => this.toggleCollapsed('jointsCollapsed')}
          >
            <Chevron />
          </VizItemCollapse>
          Joints
        </StyledOptionRow>
        {!jointsCollapsed &&
          joints &&
          map(keys(joints), (name, index) => {
            return <OptionRow key={index} label={name} separator=" " />;
          })}
      </>
    );
  }
}

export default RobotModelLinksJoints;
