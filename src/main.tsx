import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';

import './main.css';
import './styles.scss';

const rootElement = document.getElementById('root')!;

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);

if ('serviceWorker' in navigator) {
  // Register a service worker hosted at the root of the
  // site using the default scope.
  navigator.serviceWorker.register('./service-worker.js').then(
    (registration) => {
      // eslint-disable-next-line no-console
      console.log('Service worker registration succeeded:', registration);
    },
    (error) => {
      // eslint-disable-next-line no-console
      console.error(`Service worker registration failed: ${error}`);
    }
  );
} else {
  // eslint-disable-next-line no-console
  console.error('Service workers are not supported.');
}
