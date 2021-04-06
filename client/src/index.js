import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import Layout from './layout';
// import Routes from './routes';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <Layout />
        {/* <Routes /> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

