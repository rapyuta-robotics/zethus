import React from 'react';
import { HalfWidth, StyledOptionRow } from './styled';

const OptionRow = ({ label, children }) => (
  <StyledOptionRow>
    <HalfWidth>{label}:</HalfWidth>
    <HalfWidth>{children}</HalfWidth>
  </StyledOptionRow>
);

export default OptionRow;
