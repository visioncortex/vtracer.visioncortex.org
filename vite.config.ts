import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Honour the port the launcher hands us, so a stray process on 5173
    // doesn't quietly steal the preview.
    port: Number(process.env.PORT) || 5173,
    strictPort: Boolean(process.env.PORT),
  },
})
