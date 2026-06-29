tailwind.config = {
  theme: {
    extend: {
      colors: {
        /* Azuis — escala primary */
        'primary':     '#1A3C6E',  /* navy médio */
        'primary-800': '#0F2548',  /* navy escuro */
        'primary-700': '#2A4F8A',  /* navy médio-claro */
        'primary-600': '#4270B0',  /* azul médio */

        /* Marrom — escala accent */
        'accent':     '#B8926A',  /* marrom terroso */
        'accent-200': '#E8D9CC',  /* bege quente */
        'accent-100': '#F5EDE6',  /* bege claro */

        /* Neutros */
        'surface':      '#F4F6F8',  /* neutral-100 */
        'neutral-400':  '#9BA6B2',  /* neutral-400 */
        'neutral-600':  '#6B7685',  /* neutral-600 */
      },

      fontFamily: {
        heading: ['Libre Franklin', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
      },

      /* Escala tipográfica do design system */
      fontSize: {
        'display': ['58px', { lineHeight: '68px' }],
        'h1':      ['42px', { lineHeight: '54px' }],
        'h2':      ['34px', { lineHeight: '44px' }],
        'h3':      ['26px', { lineHeight: '36px' }],
        'h4':      ['20px', { lineHeight: '28px' }],
        'body-lg': ['17px', { lineHeight: '28px' }],
        'body':    ['15px', { lineHeight: '24px' }],
        'body-sm': ['13px', { lineHeight: '20px' }],
        'label':   ['11px', { lineHeight: '16px' }],
      },

      /* Sombras do design system */
      boxShadow: {
        'sm':   '0 2px 8px rgba(0,0,0,0.06)',
        'md':   '0 4px 16px rgba(0,0,0,0.08)',
        'lg':   '0 8px 32px rgba(0,0,0,0.12)',
        'glow': '0 8px 24px rgba(0,181,204,0.35)',
      },

      /* Border radius do design system */
      borderRadius: {
        'sm':  '8px',
        'md':  '12px',
        'lg':  '16px',
        'xl':  '20px',
        '2xl': '24px',
        'full': '9999px',
      },
    }
  }
}
