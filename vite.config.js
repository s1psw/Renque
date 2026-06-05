import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// Vite 配置
export default defineConfig({
  // GitHub Pages 部署路径（仓库名为 Renque）
  base: '/Renque/',
  plugins: [vue()],
  server: {
    port: 3000,
    open: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
