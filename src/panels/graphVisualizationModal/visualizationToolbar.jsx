import React, { Component } from 'react';
import PropTypes from 'prop-types';

class visualizationToolbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      debug: props.debug,
    };
  }

  render() {
    const { debug } = this.state;

    return (
      <div>
        <label>
          Debug:
          <input type="checkbox" value={debug} />
        </label>
      </div>
    );
  }
}

visualizationToolbar.propTypes = {
  debug: PropTypes.bool,
};

visualizationToolbar.defaultProps = {
  debug: true,
};

export default visualizationToolbar;
