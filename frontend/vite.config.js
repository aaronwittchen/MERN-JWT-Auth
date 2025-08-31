import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4004',
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            // ensure cookies are forwarded in dev
            proxyReq.setHeader('Origin', 'http://localhost:5173');
          })
        },
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})
