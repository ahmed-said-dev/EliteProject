import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/admin/',
  define: {
    'import.meta.env.VITE_API_BASE_URL': JSON.stringify('http://134.122.102.182/api'),
    'import.meta.env.VITE_NODE_ENV': JSON.stringify('production'),
    'import.meta.env.VITE_CORS_ENABLED': JSON.stringify('true'),
    'import.meta.env.VITE_APP_NAME': JSON.stringify('Elite Veterinary Admin Dashboard'),
  },
  server: {
    port: 5173,
    host: true,
  },
  preview: {
    port: 5173,
    host: true,
  }
})
