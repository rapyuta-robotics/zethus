import React from 'react';

const Jupyter = () => (
  <div className="cdDsl cdSection">
    <div className="cdSectionHeader">
      <h4>Notebook</h4>
      <div className="border" />
    </div>
    <iframe title="jupyter" className="jupyterFrame" src="http://localhost:8888/notebooks/Untitled.ipynb" />
  </div>
);

export default Jupyter;
