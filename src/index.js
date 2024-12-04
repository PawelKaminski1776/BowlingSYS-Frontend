import React from 'react';
import ReactDOM from 'react-dom/client'; 
import './index.css';
import App from './App';
import 'foundation-sites'; 
import $ from 'jquery';
import { BrowserRouter as Router } from 'react-router-dom';  

$(document).foundation();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <App />
  </Router>
);
