import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { ColorModeContextProvider } from 'contexts';
import SocketContextProvider from 'contexts/socket.ctx';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <SocketContextProvider>
      <ColorModeContextProvider>
        <App />
      </ColorModeContextProvider>
    </SocketContextProvider>
  </React.StrictMode>
);
