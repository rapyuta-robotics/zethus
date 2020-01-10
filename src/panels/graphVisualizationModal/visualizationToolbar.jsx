import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Select from 'react-select';

const nodeTopicOptions = [
  {
    value: 0,
    label: 'Nodes only',
  },
  {
    value: 1,
    label: 'Node/Topics (all)',
  },
];

const SelectStyled = styled(Select)`
  width: 200px !important;
  z-index: 101;
`;

function visualizationToolbar({
  changeVisualizationToolbar,
  debug,
  selectHandler,
}) {
  return (
    <div>
      <SelectStyled
        data-id="nodeSelect"
        options={nodeTopicOptions}
        defaultValue={nodeTopicOptions[0]}
        aria-label="select nodes or topics"
        onChange={selectHandler}
      />

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
