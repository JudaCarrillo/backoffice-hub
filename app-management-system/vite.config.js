import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import EnvironmentPlugin from 'vite-plugin-environment'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    EnvironmentPlugin([
      'API_VERSION', 'API_BASE_URL_CATALOG', 'API_BASE_URL_AUTH'
    ])
  ],
})
