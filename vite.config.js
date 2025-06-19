/*
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
*/

// vite.config.js
import react from '@vitejs/plugin-react'

export default {
  plugins: [react()],
  server: {
    host: true,       // exposes to 0.0.0.0
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true,   // 👈 required in Docker
    },
  },
}

