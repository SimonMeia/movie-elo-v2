import { renderToString } from '@vue/server-renderer'
import '../css/app.css'
import { createSSRApp, type DefineComponent, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import 'primeicons/primeicons.css'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import { movieEloTheme } from './presets'
import { movieEloLocale } from './locale'
import { PrimeVue } from '@primevue/core'

export default function render(page: any) {
  return createInertiaApp({
    page,
    render: renderToString,
    resolve: (name) => {
      const pages = import.meta.glob<DefineComponent>('../pages/**/*.vue')
      return pages[`../pages/${name}.vue`]()
    },

    setup({ App, props, plugin }) {
      return createSSRApp({ render: () => h(App, props) })
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
    },
  })
}
