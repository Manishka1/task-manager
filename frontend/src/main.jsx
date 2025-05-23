// frontend/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import AppRouter from './AppRouter';
import { store } from './app/store';
import theme from './Theme';
import './index.css';

const rootEl = document.getElementById('root');
ReactDOM.createRoot(rootEl).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  </Provider>
);