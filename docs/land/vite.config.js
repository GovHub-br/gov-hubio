import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',     // 👈 Build gerada dentro de 'land/dist'
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        sobre: resolve(__dirname, 'sobre.html'),
        quemsomos: resolve(__dirname, 'quem-somos.html'),
        comousar: resolve(__dirname, 'como-usar.html'),
      },
    },
  }
})