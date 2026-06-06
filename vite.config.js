import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// Vite 配置
export default defineConfig({
  // 部署路径（Cloudflare Pages 用 /，GitHub Pages 用 /Renque/）
  base: '/',
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
