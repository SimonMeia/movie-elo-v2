import { definePreset } from '@primevue/themes'
import Lara from '@primevue/themes/lara'

const presets = definePreset(Lara, {
  semantic: {
    primary: {
      50: '{zinc.50}',
      100: '{zinc.100}',
      200: '{zinc.200}',
      300: '{zinc.300}',
      400: '{zinc.400}',
      500: '{zinc.500}',
      600: '{zinc.600}',
      700: '{zinc.700}',
      800: '{zinc.800}',
      900: '{zinc.900}',
      950: '{zinc.950}',
    },
    colorScheme: {
      light: {
        primary: {
          color: '{zinc.950}',
          inverseColor: '#ffffff',
          hoverColor: '{zinc.900}',
          activeColor: '{zinc.800}',
        },
        highlight: {
          background: '{zinc.950}',
          focusBackground: '{zinc.700}',
          color: '#ffffff',
          focusColor: '#ffffff',
        },
      },
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
        color: '{primary.color}',
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
