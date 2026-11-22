import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages serves this repo at /bg3-dmg-calc/, so production asset URLs
  // need that prefix. The dev server stays at the root.
  base: command === 'build' ? '/bg3-dmg-calc/' : '/',
}))
