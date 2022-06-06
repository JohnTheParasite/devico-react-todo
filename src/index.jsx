import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import "./core.scss";

const appContainer = ReactDOM.createRoot(document.getElementById('app'));
appContainer.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
