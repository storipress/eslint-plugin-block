# warning about `component` not matching SEO spec

Because this rule is guessing block type via finding `HeroBlock` tag, please notice that it may suggest a wrong fix.

This rule has suggested fixes.

## Fail

For standard blocks:

```vue
<template>
  <TextElement component="h4">{{ article.title }}</TextElement>
  <TextElement component="h3">{{ desk }}</TextElement>
</template>
```

For hero blocks:

```vue
<template>
  <TextElement component="h3">{{ article.title }}</TextElement>
  <TextElement component="h3">{{ desk }}</TextElement>
</template>
```

## Pass

For standard blocks:

```vue
<template>
  <TextElement component="h3">{{ article.title }}</TextElement>
  <TextElement component="h4">{{ desk }}</TextElement>
</template>
```

For hero blocks:

```vue
<template>
  <TextElement component="h2">{{ article.title }}</TextElement>
  <TextElement component="h4">{{ desk }}</TextElement>
</template>
```
