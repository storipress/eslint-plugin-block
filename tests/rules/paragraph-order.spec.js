const { ruleTester } = require('../_helper')
const rule = require('../../lib/rules/paragraph-order')

ruleTester.run('paragraph-order', rule, {
  valid: [
    {
      code: `
  <template>
    <Content>
      <Paragraph :order="0" />
    </Content>
  </template>
  `,
      filename: 'test.vue',
    },
    {
      code: `
  <template>
    <Content>
      <Paragraph :order="0"></Paragraph>
      <Paragraph :order="1" />
    </Content>
  </template>
  `,
      filename: 'test.vue',
    },
    {
      code: `
  <template>
    <Content>
      <Paragraph :order="0"></Paragraph>
      <Paragraph :order="1" />
      <Paragraph :order="2" />
      <Paragraph :order="3" />
    </Content>
  </template>
  `,
      filename: 'test.vue',
    },
  ],
  invalid: [
    {
      code: `
      <template>
        <Content>
          <Paragraph />
        </Content>
      </template>
      `,
      output: `
      <template>
        <Content>
          <Paragraph :order="0" />
        </Content>
      </template>
      `,
      filename: 'test.vue',
      errors: [{ messageId: 'orderNotFound' }],
    },
    {
      code: `
      <template>
        <Content>
          <Paragraph />
          <Paragraph />
        </Content>
      </template>
      `,
      output: `
      <template>
        <Content>
          <Paragraph :order="0" />
          <Paragraph :order="1" />
        </Content>
      </template>
      `,
      filename: 'test.vue',
      errors: [{ messageId: 'orderNotFound' }, { messageId: 'orderNotFound' }],
    },
    {
      code: `
      <template>
        <Content>
          <Paragraph order="1" />
        </Content>
      </template>
      `,
      output: `
      <template>
        <Content>
          <Paragraph :order="0" />
        </Content>
      </template>
      `,
      filename: 'test.vue',
      errors: [{ messageId: 'orderShouldBeInt' }],
    },
    {
      code: `
      <template>
        <Content>
          <Paragraph :order="foo" />
        </Content>
      </template>
      `,
      output: `
      <template>
        <Content>
          <Paragraph :order="0" />
        </Content>
      </template>
      `,
      filename: 'test.vue',
      errors: [{ messageId: 'orderNotCorrect' }],
    },
    {
      code: `
      <template>
        <Content>
          <Paragraph :order="1" />
          <Paragraph :order="0" />
        </Content>
      </template>
      `,
      output: `
      <template>
        <Content>
          <Paragraph :order="0" />
          <Paragraph :order="1" />
        </Content>
      </template>
      `,
      filename: 'test.vue',
      errors: [{ messageId: 'orderNotCorrect' }, { messageId: 'orderNotCorrect' }],
    },
    {
      code: `
      <template>
        <Content>
          <Paragraph :order="0" />
          <Paragraph :order="0" />
        </Content>
      </template>
      `,
      output: `
      <template>
        <Content>
          <Paragraph :order="0" />
          <Paragraph :order="1" />
        </Content>
      </template>
      `,
      filename: 'test.vue',
      errors: [{ messageId: 'orderNotCorrect' }],
    },
  ],
})
