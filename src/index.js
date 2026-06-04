import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "@fontsource-variable/red-hat-display";

const container = document.getElementById('root');

// Check if we're in development with Fast Refresh
if (process.env.NODE_ENV === 'development') {
  // For development: clear existing root if it exists
  if (container._reactRoot) {
    delete container._reactRoot;
  }
  
  // Clear any existing children before creating new root
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

// Create root only once
if (!container._reactRoot) {
  const root = ReactDOM.createRoot(container);
  container._reactRoot = root;
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  container._reactRoot.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

reportWebVitals();