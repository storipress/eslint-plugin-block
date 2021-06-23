module.exports = {
  plugins: ['@storipress/block'],
  rules: {
    '@storipress/block/no-preview-text-with-slot': 'error',
    '@storipress/block/paragraph-order': 'error',
    '@storipress/block/link-element-no-literal-href': 'warn',
  },
}
