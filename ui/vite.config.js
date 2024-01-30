import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  define:{
    'process.env': process.env,
    global:'window'
  },
  server: {
    port: 3000,
  },
  plugins: [react()],
  test: {
    globals: true, // Enable global browser-like variables (like `window` and `document`)
    environment: 'jsdom', // Set the test environment to jsdom
  },
})
