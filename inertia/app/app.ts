import '../css/app.css'
import { createApp, type DefineComponent, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import { movieEloTheme } from './presets'
import { movieEloLocale } from './locale'

void createInertiaApp({
  progress: { color: '#c21313' },

  resolve: (name) => {
    return resolvePageComponent(
      `../pages/${name}.vue`,
      import.meta.glob<DefineComponent>('../pages/**/*.vue')
    )
  },

  setup({ el, App, props, plugin }) {
    const app = createApp({ render: () => h(App, props) })
      .use(plugin)
      .use(PrimeVue, {
        theme: movieEloTheme,
        locale: movieEloLocale,
        pt: {
          datatable: {},
        },
      })
      .use(ConfirmationService)
      .use(ToastService)

    app.mount(el)
  },
})
