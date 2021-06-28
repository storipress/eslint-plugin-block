module.exports = {
  plugins: ['@storipress/block'],
  rules: {
    '@storipress/block/no-preview-text-with-slot': 'error',
    '@storipress/block/no-block-type': 'error',
    '@storipress/block/paragraph-order': 'error',
    '@storipress/block/headline-image-missing-alt': 'error',
    '@storipress/block/link-element-no-literal-href': 'warn',
  },
}
