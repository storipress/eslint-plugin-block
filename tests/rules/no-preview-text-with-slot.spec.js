const { ruleTester } = require('../_helper')
const rule = require('../../lib/rules/no-preview-text-with-slot')

ruleTester.run('no-preview-text-with-slot', rule, {
  valid: [
    {
      code: `
  <template>
    <Content>
      <Paragraph />
    </Content>
  </template>
  `,
      filename: 'test.vue',
    },
    {
      code: `
  <template>
    <Content>
      <Paragraph></Paragraph>
      <Paragraph />
    </Content>
  </template>
  `,
      filename: 'test.vue',
    },
    {
      code: `
  <template>
    <Content>
      <Paragraph></Paragraph>
      <Header1 underline />
      <Header2 />
      <Blockquote></Blockquote>
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
          <Paragraph>foo</Paragraph>
        </Content>
      </template>
      `,
      output: `
      <template>
        <Content>
          <Paragraph/>
        </Content>
      </template>
      `,
      filename: 'test.vue',
      errors: [{ messageId: 'passingWithSlot' }],
    },
    {
      code: `
      <template>
        <Content>
          <Paragraph>foo</Paragraph>
          <Paragraph>bar</Paragraph>
        </Content>
      </template>
      `,
      output: `
      <template>
        <Content>
          <Paragraph/>
          <Paragraph/>
        </Content>
      </template>
      `,
      filename: 'test.vue',
      errors: [{ messageId: 'passingWithSlot' }, { messageId: 'passingWithSlot' }],
    },
    {
      code: `
      <template>
        <Content>
          <Paragraph>foo</Paragraph>
          <Header1>header1</Header1>
          <Paragraph>bar</Paragraph>
          <Header2>header1</Header2>
          <Paragraph>baz</Paragraph>
          <Blockquote>blockquote</Blockquote>
        </Content>
      </template>
      `,
      output: `
      <template>
        <Content>
          <Paragraph/>
          <Header1/>
          <Paragraph/>
          <Header2/>
          <Paragraph/>
          <Blockquote/>
        </Content>
      </template>
      `,
      filename: 'test.vue',
      errors: [
        { messageId: 'passingWithSlot' },
        { messageId: 'passingWithSlot' },
        { messageId: 'passingWithSlot' },
        { messageId: 'passingWithSlot' },
        { messageId: 'passingWithSlot' },
        { messageId: 'passingWithSlot' },
      ],
    },
    {
      code: `
      <template>
        <Content>
          <Paragraph>foo</Paragraph>
          <Header1 :fontSize="36">header1</Header1>
          <Paragraph>bar</Paragraph>
          <Header2 :fontSize="28">header1</Header2>
          <Paragraph>baz</Paragraph>
          <Blockquote>blockquote</Blockquote>
        </Content>
      </template>
      `,
      output: `
      <template>
        <Content>
          <Paragraph/>
          <Header1 :fontSize="36"/>
          <Paragraph/>
          <Header2 :fontSize="28"/>
          <Paragraph/>
          <Blockquote/>
        </Content>
      </template>
      `,
      filename: 'test.vue',
      errors: [
        { messageId: 'passingWithSlot' },
        { messageId: 'passingWithSlot' },
        { messageId: 'passingWithSlot' },
        { messageId: 'passingWithSlot' },
        { messageId: 'passingWithSlot' },
        { messageId: 'passingWithSlot' },
      ],
    },
  ],
})
