import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from "dotenv";
dotenv.config();
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-leaflet', 'leaflet'], // Ensure these are pre-bundled
},define: {
  'process.env': process.env
}
})
