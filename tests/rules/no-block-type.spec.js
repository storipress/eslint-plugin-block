const { ruleTester } = require('../_helper')
const rule = require('../../lib/rules/no-block-type')

ruleTester.run('no-block-type', rule, {
  valid: [
    {
      code: `
  <template>
    <TextElement kind="foo" />
  </template>
  `,
      filename: 'test.vue',
    },
    {
      code: `
  <template>
    <TextElement kind="foo" underline />
  </template>
  `,
      filename: 'test.vue',
    },
  ],
  invalid: [
    {
      code: `
      <template>
        <TextElement kind="foo" blockType="foo" />
      </template>
      `,
      output: `
      <template>
        <TextElement kind="foo"  />
      </template>
      `,
      filename: 'test.vue',
      errors: [{ messageId: 'foundBlockType' }],
    },
    {
      code: `
      <template>
        <TextElement kind="foo" blockType="foo" underline />
      </template>
      `,
      output: `
      <template>
        <TextElement kind="foo"  underline />
      </template>
      `,
      filename: 'test.vue',
      errors: [{ messageId: 'foundBlockType' }],
    },
  ],
})
