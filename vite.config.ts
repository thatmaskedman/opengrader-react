import { defineConfig } from 'vite'
import * as dotenv from 'dotenv'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'


dotenv.config()
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Opengrader APP',
        short_name: "opengrader",
        description: "Opengrader grading app",
        theme_color: '#FFFFFF',
        icons: [
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      },
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      }
    })

  ],
  server: {
    proxy: {
      '/api': {
        target: process.env.API_ROOT,
        changeOrigin: true,
        secure: false,      
        ws: true,
      },
      '/static': {
        target: process.env.API_ROOT,
        changeOrigin: true,
        secure: false,      
        ws: true,
      },
      '/media': {
        target: process.env.API_ROOT,
        changeOrigin: true,
        secure: false,      
        ws: true,
      }
    }
  }
})
