import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// GitHub Pages 部署路径
// 如果你的仓库名不是 "sleep-aid-companion"，请修改此处为你的实际仓库名
// 如果部署到自定义域名（如 https://example.com/），则设为 '/'
const base = '/sleep-aid-companion/'

export default defineConfig({
  base,
  plugins: [vue()],
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    // 确保构建输出对 GitHub Pages 友好
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})
