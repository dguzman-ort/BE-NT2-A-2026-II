import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Leading dot allows this domain and every subdomain (ngrok URLs change).
    allowedHosts: ['.ngrok-free.app'],
  },
})
