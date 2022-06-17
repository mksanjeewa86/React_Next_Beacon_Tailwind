const { join } = require('path')

module.exports = {
  mode: 'jit',
  content: [join(__dirname, './src/**/*.{js,ts,jsx,tsx}')],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
