import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import adonisjs from '@adonisjs/vite/client'
import { getDirname } from '@adonisjs/core/helpers'
import { resolve } from 'node:path'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue({
      script: { defineModel: true },
      template: { compilerOptions: { isCustomElement: (tag) => ['model-viewer'].includes(tag) } },
    }),
    adonisjs({
      /**
       * Entrypoints of your application. Each entrypoint will
       * result in a separate bundle.
       */
      entrypoints: ['resources/app.ts'],

      /**
       * Paths to watch and reload the browser on file change
       */
      reload: ['resources/views/**/*.edge'],
    }),
  ],
  resolve: {
    alias: {
      '@/': `${resolve(getDirname(import.meta.url), 'resources')}/`,
      '~/': `${resolve(getDirname(import.meta.url), '.')}/`,
    },
  },
})
