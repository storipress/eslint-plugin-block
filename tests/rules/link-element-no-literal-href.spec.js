const { ruleTester } = require('../_helper')
const rule = require('../../lib/rules/link-element-no-literal-href')

ruleTester.run('no-block-type', rule, {
  valid: [
    {
      code: `
  <template>
    <LinkElement :href="foo" />
  </template>
  `,
      filename: 'test.vue',
    },
    {
      code: `
  <template>
    <LinkElement />
  </template>
  `,
      filename: 'test.vue',
    },
    {
      code: `
  <template>
    <LinkElement href="/" />
  </template>
  `,
      filename: 'test.vue',
    },
  ],
  invalid: [
    {
      code: `
      <template>
        <LinkElement href="foo" />
      </template>
      `,
      filename: 'test.vue',
      errors: [{ messageId: 'literalHref' }],
    },
    {
      code: `
      <template>
        <LinkElement href="https://example.com" />
      </template>
      `,
      filename: 'test.vue',
      errors: [{ messageId: 'literalHref' }],
    },
  ],
})
