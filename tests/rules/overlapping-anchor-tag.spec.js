const { ruleTester } = require('../_helper')
const rule = require('../../lib/rules/overlapping-anchor-tag')

ruleTester.run('overlapping-anchor-tag', rule, {
  valid: [
    {
      code: `
  <template>
    <div>
      <AuthorList>
        <Authors />
      </AuthorList>
    </div>
  </template>
  `,
      filename: 'test.vue',
    },
    {
      code: `
  <template>
    <div>
      <AuthorList>
        <Authors />
      </AuthorList>
      <LinkElement :href="foo">
        <TextInput />
      </LinkElement>
    </div>
  </template>
  `,
      filename: 'test.vue',
    },
    {
      code: `
  <template>
    <TextElement>
      <Authors />
    </TextElement>
  </template>
  `,
      filename: 'test.vue',
    },
  ],
  invalid: [
    {
      code: `
  <template>
    <LinkElement :href="foo">
      <AuthorList>
        <Authors />
      </AuthorList>
    </LinkElement>
  </template>
  `,
      filename: 'test.vue',
      errors: [{
        messageId: 'overlappingAnchorTag',
        data: { overlappingTagName: 'Authors', tagName: 'LinkElement' }
      }],
    },
    {
      code: `
  <template>
    <a :href="foo">
      <div>
        <AuthorList>
          <Authors />
        </AuthorList>
      </div>
    </a>
  </template>
  `,
      filename: 'test.vue',
      errors: [{
        messageId: 'overlappingAnchorTag',
        data: { overlappingTagName: 'Authors', tagName: 'a' }
      }],
    },
    {
      code: `
  <template>
    <a :href="foo">
      <div>
        <div>
          <LinkElement :href="foo">
            <TextInput />
          </LinkElement>
        </div>
      </div>
    </a>
  </template>
  `,
      filename: 'test.vue',
      errors: [{
        messageId: 'overlappingAnchorTag',
        data: { overlappingTagName: 'LinkElement', tagName: 'a' }
      }],
    },
    {
      code: `
  <template>
    <LinkElement :href="foo">
      <div>
        <div>
          <LinkElement>
            <div></div>
          </LinkElement>
        </div>
      </div>
    </LinkElement>
  </template>
  `,
      filename: 'test.vue',
      errors: [{
        messageId: 'overlappingAnchorTag',
        data: { overlappingTagName: 'LinkElement', tagName: 'LinkElement' }
      }],
    },
    {
      code: `
  <template>
    <a :href="foo">
      <div>
        <div>
          <a :href="foo" />
        </div>
      </div>
    </a>
  </template>
  `,
      filename: 'test.vue',
      errors: [{
        messageId: 'overlappingAnchorTag',
        data: { overlappingTagName: 'a', tagName: 'a' }
      }],
    },
    {
      code: `
  <template>
    <LinkElement :href="foo">
      <div>
        <a :href="foo" />
      </div>
    </LinkElement>
  </template>
  `,
      filename: 'test.vue',
      errors: [{
        messageId: 'overlappingAnchorTag',
        data: { overlappingTagName: 'a', tagName: 'LinkElement' }
      }],
    },
  ],
})
