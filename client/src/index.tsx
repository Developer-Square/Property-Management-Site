import React from 'react';
import { createRoot } from 'react-dom/client';
import store from './app/store'
import { Provider } from 'react-redux';

import App from './App';
import SocketContextProvider from 'contexts/socket.ctx';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <SocketContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </SocketContextProvider>
  </React.StrictMode>
);
