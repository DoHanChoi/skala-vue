import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  build: {
    rollupOptions: {
      input: {
        // 과제 결과물(1~4일차) — 라우터가 붙어 있으므로 반드시 index.html이어야 한다
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        // 강의 예제 모음 — 라우터와 무관한 정적 페이지
        practice: fileURLToPath(new URL('./practice.html', import.meta.url)),
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
