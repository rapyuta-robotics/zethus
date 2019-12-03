import React from 'react';
import _ from 'lodash';
import shortid from 'shortid';
import withGracefulUnmount from 'react-graceful-unmount';
import store from 'store';

import Panels from './panels';

import { DEFAULT_CONFIG } from './utils';

class Zethus extends React.Component {
  constructor(props) {
    super(props);
    const providedConfig =
      props.configuration || store.get('zethus_config') || {};

    this.state = {
      ..._.merge(DEFAULT_CONFIG, providedConfig),
    };
    this.updateVizOptions = this.updateVizOptions.bind(this);
    this.updateRosEndpoint = this.updateRosEndpoint.bind(this);
    this.updateGlobalOptions = this.updateGlobalOptions.bind(this);
    this.addVisualization = this.addVisualization.bind(this);
    this.removeVisualization = this.removeVisualization.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.updateConfiguration = this.updateConfiguration.bind(this);
  }

  updateConfiguration(configuration, replaceOnExisting) {
    let newState = {};
    if (replaceOnExisting) {
      newState = {
        ...this.state,
        ...configuration,
      };
    } else {
      newState = {
        ..._.merge(this.state, configuration),
      };
    }
    this.setState(newState);
  }

  updateVizOptions(key, options) {
    const { visualizations } = this.state;
    this.setState({
      visualizations: _.map(visualizations, v =>
        v.key === key ? { ...v, ...options } : v,
      ),
    });
  }

  updateRosEndpoint(endpoint) {
    const { ros } = this.state;
    this.setState({
      ros: {
        ...ros,
        endpoint,
      },
    });
  }

  componentWillUnmount() {
    store.set('zethus_config', this.state);
  }

  updateGlobalOptions(path, option) {
    const { globalOptions } = this.state;
    const clonedGlobalOptions = _.cloneDeep(globalOptions);
    _.set(clonedGlobalOptions, path, option);
    this.setState({
      globalOptions: clonedGlobalOptions,
    });
  }

  removeVisualization(e) {
    const {
      dataset: { id: vizId },
    } = e.target;
    const { visualizations } = this.state;
    this.setState({
      visualizations: _.filter(visualizations, v => v.key !== vizId),
    });
  }

  toggleVisibility(e) {
    const {
      dataset: { id: vizId },
    } = e.target;
    const { visualizations } = this.state;
    this.setState({
      visualizations: _.map(visualizations, v =>
        v.key === vizId
          ? {
              ...v,
              visible: !!(_.isBoolean(v.visible) && !v.visible),
            }
          : v,
      ),
    });
  }

  addVisualization(vizOptions) {
    const { visualizations } = this.state;
    this.setState({
      visualizations: [
        ...visualizations,
        {
          ...vizOptions,
          key: shortid.generate(),
        },
      ],
    });
  }

  render() {
    return (
      <Panels
        configuration={this.state}
        addVisualization={this.addVisualization}
        removeVisualization={this.removeVisualization}
        toggleVisibility={this.toggleVisibility}
        updateConfiguration={this.updateConfiguration}
        updateVizOptions={this.updateVizOptions}
        updateRosEndpoint={this.updateRosEndpoint}
        updateGlobalOptions={this.updateGlobalOptions}
      />
    );
  }
}

export default withGracefulUnmount(Zethus);
