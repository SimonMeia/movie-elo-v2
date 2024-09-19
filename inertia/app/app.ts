import '../css/app.css'

import { createApp, h, ref, type DefineComponent } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'

import PrimeVue, { defaultOptions } from 'primevue/config'
import 'primeicons/primeicons.css'
import Lara from '@/presets/lara'

void createInertiaApp({
  progress: { color: '#5468FF' },

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
        unstyled: true,
        pt: Lara,
        locale: {
          ...defaultOptions.locale,
          firstDayOfWeek: 1,
          dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
          dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
          dayNamesMin: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
          monthNames: [
            'Janvier',
            'Fevrier',
            'Mars',
            'Avril',
            'Mai',
            'Juin',
            'Juillet',
            'Aout',
            'Septembre',
            'Octobre',
            'Novembre',
            'Decembre',
          ],
          monthNamesShort: [
            'Jan',
            'Fev',
            'Mar',
            'Avr',
            'Mai',
            'Jun',
            'Jul',
            'Aou',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
          dateFormat: 'dd/mm/yy',
          today: "Aujourd'hui",
          clear: 'Déselectionner',
        },
      })

    const modelViewerScriptLoaded = ref(false)
    app.config.globalProperties.modelViewerScriptLoaded = modelViewerScriptLoaded

    function loadModelViewerScript() {
      if (modelViewerScriptLoaded.value || !window.matchMedia('(min-width: 768px)').matches) {
        return
      }

      const scriptEl = document.createElement('script')
      scriptEl.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js'
      scriptEl.async = true
      scriptEl.type = 'module'
      scriptEl.onload = () => {
        modelViewerScriptLoaded.value = true
      }

      document.body.appendChild(scriptEl)
    }

    setTimeout(() => {
      window.requestIdleCallback(() => {
        loadModelViewerScript()
      })

      window.addEventListener('resize', () => {
        loadModelViewerScript()
      })
    }, 100)

    app.mount(el)
  },
})
