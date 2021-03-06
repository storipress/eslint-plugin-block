module.exports = {
  plugins: ['@storipress/block'],
  rules: {
    '@storipress/block/no-preview-text-with-slot': 'error',
    '@storipress/block/no-block-type': 'error',
    '@storipress/block/paragraph-order': 'error',
    '@storipress/block/image-without-src': 'error',
    '@storipress/block/headline-image-missing-alt': 'error',
    '@storipress/block/link-element-no-literal-href': 'warn',
    '@storipress/block/image-with-literal-src': 'warn',
    '@storipress/block/seo-tags': 'warn',
    '@storipress/block/conflict-classes': 'warn',
    '@storipress/block/overlapping-anchor-tag': 'error',
    '@storipress/block/no-mixed-sdk-import': 'error',
  },
}
