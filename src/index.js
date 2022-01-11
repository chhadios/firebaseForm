import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Myprovider } from './context'

ReactDOM.render(
  <React.StrictMode>
    <Myprovider>
    <App />
    </Myprovider>
  </React.StrictMode>,
  document.getElementById('root')
);


