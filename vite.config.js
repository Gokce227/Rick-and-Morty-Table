import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/Rick-and-Morty-Table/', // Projenin yolu
  plugins: [
    tailwindcss(),
    react(),
  ],
})
