import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') }
  },
  build: {
    minify: 'esbuild',
    cssCodeSplit: true,
    polyfillModulePreload: true,
    reportCompressedSize: true
  }
})
