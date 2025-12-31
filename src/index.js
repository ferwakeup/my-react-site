import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App'; // This assumes your main code is in App.js


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);