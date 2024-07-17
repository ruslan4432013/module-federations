import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import federation from "@originjs/vite-plugin-federation";
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5001,
  },
  preview: {
    port: 5001,
    strictPort: true
  },
  plugins: [
    react(),
    federation({
      name: 'vite_service_example',

      filename: 'remoteEntry.js',
      exposes: {
        './hello': './src/hello.tsx',
      }
    })],
})
