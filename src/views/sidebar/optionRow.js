import React from 'react';

const OptionRow = ({ label, children }) => (
  <div className="optionRow">
    <div className="halfWidth">{label}:</div>
    <div className="halfWidth">{children}</div>
  </div>
);

export default OptionRow;
