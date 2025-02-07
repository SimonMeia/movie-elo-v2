import { defineConfig } from '@adonisjs/inertia'
import app from '@adonisjs/core/services/app'

export default defineConfig({
  /**
   * Path to the Edge view that will be used as the root view for Inertia responses
   */
  rootView: 'inertia_layout',

  ssr: {
    enabled: true,
    entrypoint: 'inertia/app/ssr.ts',
    pages: ['landing/main'],
  },

  /**
   * Data that should be shared with all rendered pages
   */
  sharedData: {
    environment: app.inProduction ? 'production' : 'development',
    user: (ctx) => ctx.auth?.user,
    errors: (ctx) => ctx.session?.flashMessages.get('errors'),
  },
})
