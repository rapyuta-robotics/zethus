import React from 'react';
import _ from 'lodash';
import Panels from './panels';

import { DEFAULT_CONFIG } from './utils';

class Zethus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...(props.configuration || DEFAULT_CONFIG),
    };
    this.updateVizOptions = this.updateVizOptions.bind(this);
    this.updateRosEndpoint = this.updateRosEndpoint.bind(this);
    this.updateGlobalOptions = this.updateGlobalOptions.bind(this);
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

  updateGlobalOptions(path, option) {
    const { globalOptions } = this.state;
    const clonedGlobalOptions = _.cloneDeep(globalOptions);
    _.set(clonedGlobalOptions, path, option);
    this.setState({
      globalOptions: clonedGlobalOptions,
    });
  }

  render() {
    return (
      <Panels
        configuration={this.state}
        updateVizOptions={this.updateVizOptions}
        updateRosEndpoint={this.updateRosEndpoint}
        updateGlobalOptions={this.updateGlobalOptions}
      />
    );
  }
}

export default Zethus;
