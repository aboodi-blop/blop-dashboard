import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  server: {
    port: 3000,
    host: true,
    hmr: {
      overlay: false
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'firebase': ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/storage'],
          'ui': ['lucide-react', 'framer-motion'],
          'vendor': ['react', 'react-dom']
        }
      }
    }
  },
  define: {
    // Explicitly define global variables for better compatibility
    global: 'globalThis',
  },
  optimizeDeps: {
    include: [
      'firebase/app',
      'firebase/auth', 
      'firebase/firestore',
      'firebase/storage'
    ]
  }
})