import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 4159,
    host: true,
    proxy: {
      '/api': {
        target: 'https://scan.test2.btcs.network',
        changeOrigin: true,
        secure: false,
      }
    }
  },
})
