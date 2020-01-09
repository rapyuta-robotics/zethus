import React from 'react';
import PropTypes from 'prop-types';

function visualizationToolbar({ changeVisualizationToolbar, debug }) {
  return (
    <div>
      <label htmlFor="debug">
        Debug:
        <input
          id="debug"
          data-id="debug"
          type="checkbox"
          checked={debug}
          value={debug}
          onChange={changeVisualizationToolbar}
        />
      </label>
    </div>
  );
}

visualizationToolbar.propTypes = {
  debug: PropTypes.bool,
};

visualizationToolbar.defaultProps = {
  debug: true,
};

export default visualizationToolbar;
