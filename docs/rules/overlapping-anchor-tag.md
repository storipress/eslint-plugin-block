# error about anchor tag within anchor tag


## Fail

```vue
<template>
  <LinkElement :href="foo">
    <AuthorList>
      <Authors />
    </AuthorList>
  </LinkElement>
</template>
```

```vue
<template>
  <LinkElement :href="foo">
    <div>
      <LinkElement />
    </div>
  </LinkElement>
</template>
```

```vue
<template>
  <a :href="foo">
    <a />
  </a>
</template>
```

## Pass

```vue
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
```
