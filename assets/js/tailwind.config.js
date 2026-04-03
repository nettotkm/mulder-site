tailwind.config = {
  theme: {
    extend: {
      colors: {
        /* Primários — azuis */
        primary:       '#0B1929',  /* primary-900 */
        'primary-dk':  '#071018',  /* primary-800 */
        'primary-700': '#2A3360',  /* primary-700 */
        'primary-600': '#3F4A85',  /* primary-600 */

        /* Accent — dourado/bege */
        accent:          '#C49759',  /* beige-300 */
        'accent-light':  '#E8DCCB',  /* beige-200 */
        'accent-lighter':'#F5EFE6',  /* beije-100 */

        /* Cinzas */
        surface:      '#F4F6F8',  /* gray-100 */
        'gray-mid':   '#9BA6B2',  /* gray-400 */
        'gray-dark':  '#6B7685',  /* gray-600 */
      },
      fontFamily: {
        heading: ['Libre Franklin', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
      },
    }
  }
}
