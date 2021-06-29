# warning about finding literal value for href on LinkElement

## Fail

```vue
<template>
  <LinkElement href="foo" />
  <LinkElement href="https://example.com" />
</template>
```

## Pass

```vue
<template>
  <LinkElement :href="foo" />
  <!-- `/` is an exception -->
  <LinkElement href="/" />
</template>
```
