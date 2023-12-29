import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { StrictMode } from 'react'
 
 const callFunction = async () => {

  const { worker } = await import('./_mockData/browser'); 
  worker.start();
 }

/*  // src/main.js or src/main.ts
if (import.meta.env.VITE_MSW_ENABLED === 'true') {
  const { worker } = require('./mocks');
  worker.start();
} */

if (process.env.NODE_ENV === 'development') {
   callFunction()

}
const root = createRoot(document.getElementById('root'))

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);