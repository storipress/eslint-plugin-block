# automatically add `order` prop for Paragraph element

This rule is fixable.

## Fail

```vue
<template>
  <Content>
    <Paragraph :order="1" />
    <Paragraph />
    <Paragraph :order="foo" />
  </Content>
</template>
```

## Pass

```vue
<template>
  <Content>
    <Paragraph :order="0" />
    <Paragraph :order="1" />
    <Paragraph :order="2" />
  </Content>
</template>
```
