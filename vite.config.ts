import { defineConfig } from 'vite'
import * as dotenv from 'dotenv'
import react from '@vitejs/plugin-react'

dotenv.config()
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.API_ROOT,
        changeOrigin: true,
        secure: false,      
        ws: true,
      }
    }
  }
})
