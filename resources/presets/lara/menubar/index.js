export default {
  root: {
    class: [
      'relative',

      // Flexbox
      'flex',
      'items-center',

      // Spacing
      'py-2',
      'container',

      // Shape
      'rounded-md',

      // Color
      // 'bg-surface-50 dark:bg-surface-700',
      // 'border border-surface-200 dark:border-surface-700'
    ],
  },
  menu: ({ props }) => ({
    class: [
      // Flexbox
      'lg:flex',
      'items-center',
      'flex-wrap',
      'flex-col lg:flex-row',
      'justify-end',
      'grow',
      { hidden: !props?.mobileActive, flex: props?.mobileActive },

      // Position
      'absolute lg:relative',
      'top-full left-0',
      'lg:top-auto lg:left-auto',

      // Size
      'w-full lg:w-auto',

      // Spacing
      'mr-6',
      'py-1 lg:py-0 lg:p-0',
      'list-none',

      // Shape
      'shadow-md lg:shadow-none',
      'border-0',

      // Color
      'bg-surface-0 dark:bg-surface-700 lg:bg-transparent',

      // Misc
      'outline-none',
    ],
  }),
  menuitem: {
    class: 'lg:relative lg:w-auto w-full static',
  },
  content: ({ props, context }) => ({
    class: [
      // Shape
      { 'rounded-md': props.root },

      //  Colors
      {
        'text-surface-500 dark:text-white/70': !context.focused && !context.active,
        'text-surface-500 dark:text-white/70 bg-surface-200 dark:bg-surface-600/90':
          context.focused && !context.active,
        'text-primary-700 dark:text-surface-0/80 bg-primary-50 dark:bg-primary-400/30':
          context.focused && context.active,
        'text-primary-700 dark:text-surface-0/80 bg-primary-50 dark:bg-primary-400/30':
          !context.focused && context.active,
      },

      // Hover States
      {
        'hover:bg-surface-100 dark:hover:bg-surface-600/80': !context.active,
        'hover:bg-primary-500/50 dark:hover:bg-primary-300/30 text-primary-700 dark:text-surface-0/80':
          context.active,
      },

      // Transitions
      'transition-all',
      'duration-200',
    ],
  }),
  action: ({ context }) => ({
    class: [
      'relative',

      // Flexbox
      'flex',
      'items-center',

      // Spacing
      'py-3',
      'px-5',

      // Size
      {
        'pl-9 lg:pl-5': context.level === 1,
        'pl-14 lg:pl-5': context.level === 2,
      },
      'leading-none',

      // Misc
      'select-none',
      'cursor-pointer',
      'no-underline ',
      'overflow-hidden',
    ],
  }),
  icon: {
    class: 'mr-2',
  },
  submenuicon: ({ props }) => ({
    class: [
      {
        'ml-auto lg:ml-2': props.root,
        'ml-auto': !props.root,
      },
    ],
  }),
  submenu: ({ props }) => ({
    class: [
      // Size
      'w-full lg:w-48',

      // Spacing
      'py-1',
      'm-0',
      'list-none',

      // Shape
      'shadow-none lg:shadow-md',
      'border-0',

      // Position
      'static lg:absolute',
      'z-10',
      { 'lg:absolute lg:left-full lg:top-0': props.level > 1 },

      // Color
      'bg-surface-0 dark:bg-surface-700',
    ],
  }),
  separator: {
    class: 'border-t border-surface-200 dark:border-surface-600 my-1',
  },
  button: {
    class: [
      // Flexbox
      'flex lg:hidden',
      'items-center justify-center',

      // Size
      'w-8',
      'h-8',

      // Spacing
      'ml-auto',
      'mr-6',

      // Shape
      'rounded-full',
      // Color
      'text-surface-500 dark:text-white/80',

      // States
      'hover:text-surface-600 dark:hover:text-white/60',
      'hover:bg-surface-100 dark:hover:bg-surface-600/80',
      'focus:outline-none focus:outline-offset-0',
      'focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50',

      // Transitions
      'transition duration-200 ease-in-out',

      // Misc
      'cursor-pointer',
      'no-underline',
    ],
  },
  end: {
    class: 'self-center',
  },
}
