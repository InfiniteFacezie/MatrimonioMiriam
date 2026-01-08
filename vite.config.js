import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Aggiungi questa riga

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Aggiungi questo plugin
  ],
})