import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// 统一配置：同时供 vite dev/build 与 vitest 使用
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
  },
})
