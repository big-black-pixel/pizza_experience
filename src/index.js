import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router';

import { Provider } from 'react-redux';
import { Store } from '@reduxjs/toolkit';
import { store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Provider store = { store }>
      <App />
    </Provider>
  </BrowserRouter>
);
