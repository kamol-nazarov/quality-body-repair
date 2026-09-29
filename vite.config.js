import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves project sites from a subpath; local dev stays at root.
const isPagesDeploy = process.env.GITHUB_ACTIONS === 'true'

export default defineConfig({
  base: isPagesDeploy ? '/quality-body-repair/' : '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
