import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.css';
import './styles/topBar.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename='/stock-crawler-tw'>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
