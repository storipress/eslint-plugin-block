module.exports = {
  rules: {
    'no-preview-text-with-slot': require('./rules/no-preview-text-with-slot'),
    'no-block-type': require('./rules/no-block-type'),
    'headline-image-missing-alt': require('./rules/headline-image-missing-alt'),
    'paragraph-order': require('./rules/paragraph-order'),
    'link-element-no-literal-href': require('./rules/link-element-no-literal-href'),
    'image-with-literal-src': require('./rules/image-with-literal-src'),
    'image-without-src': require('./rules/image-without-src'),
  },
  configs: {
    recommended: require('./configs/recommended'),
  },
}
