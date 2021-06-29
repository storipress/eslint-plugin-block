# remove deprecated `blockType`

This rule is fixable.

## Fail

```vue
<template>
  <TextElement kind="foo" blockType="foo" />
  <TextElement kind="foo" blockType="foo" underline />
</template>
```

## Pass

```vue
<template>
  <TextElement kind="foo" />
  <TextElement kind="foo" underline />
</template>
```
