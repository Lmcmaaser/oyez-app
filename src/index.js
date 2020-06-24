import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Store from './static-data';
import App from './App';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <App data={Store}/>
  </BrowserRouter>,
  document.getElementById('root')
);
