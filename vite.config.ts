import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [react()],
  assetsInclude: ['public', 'src/assets'],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'mobx-react-lite'],
          ui: ['@radix-ui/themes'],
          data: ['./src/assets/data/students.json']
        }
      }
    }
  }
})
