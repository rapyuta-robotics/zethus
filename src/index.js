import React from 'react';
import ReactDOM from 'react-dom';
import Wrapper from './panels';

import { DEFAULT_CONFIG } from './utils';

ReactDOM.render(
  <Wrapper configuration={DEFAULT_CONFIG} />,
  document.getElementById('root'),
);
