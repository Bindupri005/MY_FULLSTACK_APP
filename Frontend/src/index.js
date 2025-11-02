import React from 'react';
// Use createRoot for modern React 18+ rendering
import { createRoot } from 'react-dom/client'; 
import App from './App'; // Import the main App component

// Get the element where the app will live
const container = document.getElementById('root');

// Create the root object
const root = createRoot(container); 

// Render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);