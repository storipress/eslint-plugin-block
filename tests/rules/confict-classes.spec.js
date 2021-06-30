const { ruleTester } = require('../_helper')
const rule = require('../../lib/rules/conflict-classes')

ruleTester.run('conflict-classes', rule, {
  valid: [
    {
      code: `
  <template>
    <TextElement class="foo bar" />
  </template>
  `,
      filename: 'test.vue',
    },
    {
      code: `
  <template>
    <TextElement class="p-1 m-1" />
  </template>
  `,
      filename: 'test.vue',
    },
    {
      code: `
  <template>
    <TextInput class="lg:p-1 md:m-1" />
  </template>
  `,
      filename: 'test.vue',
    },
    {
      code: `
  <template>
    <p class="font-bold" />
  </template>
  `,
      filename: 'test.vue',
    },
  ],
  invalid: [
    {
      code: `
  <template>
    <TextElement class="text-sm" />
  </template>
  `,
      filename: 'test.vue',
      errors: [{ messageId: 'conflictClass', data: { name: 'text-sm' } }],
    },
    {
      code: `
  <template>
    <TextElement class="underline font-bold" />
  </template>
  `,
      filename: 'test.vue',
      errors: [
        { messageId: 'conflictClass', data: { name: 'underline' } },
        { messageId: 'conflictClass', data: { name: 'font-bold' } },
      ],
    },
    {
      code: `
  <template>
    <TextInput class="md:underline sm:font-bold lg:uppercase" />
  </template>
  `,
      filename: 'test.vue',
      errors: [
        { messageId: 'conflictClass', data: { name: 'md:underline' } },
        { messageId: 'conflictClass', data: { name: 'sm:font-bold' } },
        { messageId: 'conflictClass', data: { name: 'lg:uppercase' } },
      ],
    },
  ],
})
