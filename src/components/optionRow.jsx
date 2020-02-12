import React from 'react';
import { HalfWidth, StyledOptionRow } from './styled';

const OptionRow = ({ label, children, separator }) => {
  return (
    <StyledOptionRow>
      <HalfWidth>
        {label}
        {separator || ':'}
      </HalfWidth>
      <HalfWidth>{children}</HalfWidth>
    </StyledOptionRow>
  );
};

export default OptionRow;
