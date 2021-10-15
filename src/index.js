import React from 'react';
import reactDom from 'react-dom';
import './styles/global.css';

import { Home } from './templates/Home';


reactDom.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  document.getElementById('root')
);