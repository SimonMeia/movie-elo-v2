import { definePreset } from '@primevue/themes'
import Lara from '@primevue/themes/lara'

const presets = definePreset(Lara, {
  semantic: {
    primary: {
      50: '{slate.50}',
      100: '{slate.100}',
      200: '{slate.200}',
      300: '{slate.300}',
      400: '{slate.400}',
      500: '{slate.500}',
      600: '{slate.600}',
      700: '{slate.700}',
      800: '{slate.800}',
      900: '{slate.900}',
      950: '{slate.950}',
    },
  },
  components: {
    menubar: {
      border: {
        color: '{surface.0}',
        radius: '0',
      },
      padding: '0.75rem 1.5rem',
    },
    tabs: {
      tab: {
        border: {
          width: '0 0 2px 0',
        },
      },
    },
  },
})

export const movieEloTheme = {
  preset: presets,
  options: {
    darkModeSelector: false || 'none',
  },
}
