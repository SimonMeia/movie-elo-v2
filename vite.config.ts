import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import adonisjs from '@adonisjs/vite/client'
import { getDirname } from '@adonisjs/core/helpers'
import { resolve } from 'node:path'
import inertia from '@adonisjs/inertia/client'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'

export default defineConfig({
  plugins: [
    vue({
      script: { defineModel: true },
      template: { compilerOptions: { isCustomElement: (tag) => ['model-viewer'].includes(tag) } },
    }),
    Components({
      resolvers: [PrimeVueResolver()],
    }),
    adonisjs({
      /**
       * Entrypoints of your application. Each entrypoint will
       * result in a separate bundle.
       */
      entrypoints: ['inertia/app/app.ts'],

      /**
       * Paths to watch and reload the browser on file change
       */
      reload: ['resources/views/**/*.edge'],
    }),
    inertia({ ssr: { enabled: false } }),
    adonisjs({ entrypoints: ['inertia/app/app.ts'], reload: ['resources/views/**/*.edge'] }),
  ],
  resolve: {
    alias: {
      '@/': `${resolve(getDirname(import.meta.url), 'inertia')}/`,
      '~/': `${resolve(getDirname(import.meta.url), '.')}/`,
    },
  },
})
