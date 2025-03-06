import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Nugatory-06-Medals-React',
  plugins: [react()],
})
