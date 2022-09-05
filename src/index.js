import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeParse } from '@parse/react';

// my own parse initialization (parse project id and key)
initializeParse(
  process.env.REACT_APP_PARSE_SERVER_URL,
  process.env.REACT_APP_PARSE_APP_ID,
  process.env.REACT_APP_PARSE_JAVASCRIPT_KEY
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
