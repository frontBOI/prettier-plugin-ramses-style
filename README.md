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

# Useful links

[AST explorer](https://astexplorer.net)
[Babel AST explorer)](https://ast.sxzz.moe)
[Simple tutorial](https://medium.com/@fvictorio/how-to-write-a-plugin-for-prettier-a0d98c845e70)

---

### Support

You can create a PR on this project and I will review it.
If you prefer, you can contact me on Linkedin or by email (contact@tomblanchet.fr).

_Tom Blanchet - 2024_
