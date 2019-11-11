import ReactDOM from 'react-dom';
import React from 'react';

import Zethus from './zethus';
import { GlobalStyle } from './components/styled';

ReactDOM.render(
  <>
    <GlobalStyle />
    <Zethus />
  </>,
  document.getElementById('root'),
);
