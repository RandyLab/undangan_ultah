import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: "/undangan_ultah /",
  plugins: [
    tailwindcss(),
  ],
})