// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy all requests to your backend
      '/achatempo': {
        target: 'https://fadesol-puoc.vercel.app',
        changeOrigin: true,
        secure: false, // Use this option if you are using self-signed certificates
      },
    },
  },
});
