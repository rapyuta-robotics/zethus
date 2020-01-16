import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Select from 'react-select';

import { Container } from '../../components/styled';
import { NODE_OPTIONS } from './constants';

const SelectStyled = styled(Select)`
  width: 200px !important;
  z-index: 101;
`;

const Wrapper = styled(Container)`
  padding-left: 0;
`;

function visualizationToolbar({
  changeVisualizationToolbar,
  debug,
  selectHandler,
  nodeSelect,
}) {
  return (
    <Wrapper>
      <SelectStyled
        data-id="nodeSelect"
        options={NODE_OPTIONS}
        defaultValue={nodeSelect}
        aria-label="select nodes or topics"
        onChange={selectHandler}
      />

      {/* Could be included in a different pr with all filtering options. */}
      {/* <label htmlFor="debug">
        Debug:
        <input
          id="debug"
          data-id="debug"
          type="checkbox"
          checked={debug}
          value={debug}
          onChange={changeVisualizationToolbar}
        />
      </label> */}
    </Wrapper>
  );
}

visualizationToolbar.propTypes = {
  debug: PropTypes.bool,
};

visualizationToolbar.defaultProps = {
  debug: true,
};

export default visualizationToolbar;
