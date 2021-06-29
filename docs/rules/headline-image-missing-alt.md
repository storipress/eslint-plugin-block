# add alt when img has a src which contains `headline`

This rule is fixable.

## Fail

```vue
<template>
  <img :src="article.headline" />
</template>
```

## Pass

```vue
<template>
  <img src="foo" />
  <img :src="article.headline" :alt="article.headlineAlt" />
</template>
```
