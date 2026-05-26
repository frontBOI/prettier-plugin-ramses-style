<div align='center'>
    <img src="doc/pyramid.webp" height="128">
    <h1 align='center'>Ramses style</h1>
</div>

<div align="center">
    <img src=https://img.shields.io/badge/Created_by-Tom_Blanchet-blue?color=FED205&style=for-the-badge>
    <img src=https://img.shields.io/badge/Maintained%20%3F-yes-green.svg?style=for-the-badge>
</div>
 
<div align="center">
    <a href='https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwiFmq2GueKEAxXf_7sIHcONCvcQFnoECBEQAQ&url=https%3A%2F%2Ffr.linkedin.com%2Fin%2Ftom-blanchet&usg=AOvVaw2NyolXUeo7ja8PpF4VNmHt&opi=89978449'>
    <img src=https://img.shields.io/badge/Tom_Blanchet-0077B5?logo=linkedin&logoColor=white&style=for-the-badge>
    </a>
</div>

A Prettier plugin to help you format Javascript and Typescript projects in a Ramses style easily.

# Intro

Prettier is an opinionated code formatter. It enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary.

# Install

```sh
npm install -D @frontboi/prettier-plugin-ramses-style
```

You then need to configure your `.prettierrc.json`:

```json
{
  "plugins": ["@frontboi/prettier-plugin-ramses-style"]
}
```

# How it works

A Prettier plugin must first parse the source code of the target language
into a traversable data structure (Usually an **A**bstract **S**yntax **T**ree)
and then print out that data structure in a "pretty" style.

‼️ A prettier plugin **MUST** be developped in `CommonJS`.

## Code styling: cascading order

To keep code visually consistent, apply a cascading order for:

- JSX props
- object declarations
- object destructuring
- object parameters in functions
- TypeScript `type` and `interface` fields
- TypeScript `enum` members

`Cascading order` means entries are sorted by identifier length, from shortest to longest.

If two identifiers have the same length, sort them alphabetically.

Good:

```tsx
<PromptCard id={id} icon={icon} title={title} isPinned={isPinned} />
```

```ts
const promptCardProps = {
  id,
  icon,
  title,
  isPinned,
}
```

```ts
const { id, icon, title, isPinned } = promptCardProps
```

```ts
function renderPrompt({
  id,
  icon,
  title,
  isPinned,
}: {
  id: string
  icon: ReactNode
  title: string
  isPinned: boolean
}) {
  return `${id}:${title}`
}
```

```ts
type PromptCardProps = {
  id: string
  icon: ReactNode
  title: string
  isPinned: boolean
}
```

```ts
enum PromptCardAction {
  Pin = 'pin',
  Open = 'open',
  Archive = 'archive',
}
```

Bad:

```tsx
<PromptCard isPinned={isPinned} id={id} title={title} icon={icon} />
```

```ts
const promptCardProps = {
  title,
  id,
  isPinned,
  icon,
}
```

# Testing

You can try this package on a file using this custom script:

```sh
npm run prettify -- test/fixtures/comments.js
```

# Disable plugin for one file

If you need to bypass this plugin for a specific file, add this comment at the very top:

```js
// @ramses-style-disable
```

When this marker is present in the first file comment, the plugin returns the source unchanged for that file.

# Useful links

[AST explorer](https://astexplorer.net)
[Babel AST explorer)](https://ast.sxzz.moe)
[Simple tutorial](https://medium.com/@fvictorio/how-to-write-a-plugin-for-prettier-a0d98c845e70)

---

### Support

You can create a PR on this project and I will review it.
If you prefer, you can contact me on Linkedin or by email (contact@tomblanchet.fr).

_Tom Blanchet - 2024_
