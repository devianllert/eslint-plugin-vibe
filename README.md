# `eslint-plugin-vibeast`

Project specific linting rules for `eslint`

## Installation

```sh
npm install eslint eslint-plugin-vibeast --save-dev
```


## Configuration (legacy: `.eslintrc*`) <a id="configuration"></a>

 
Enable JSX support.

With `eslint` 2+

```json
{
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  }
}
```

## Configuration (new: `eslint.config.js`)

From [`v8.21.0`](https://github.com/eslint/eslint/releases/tag/v8.21.0), eslint announced a new config system.
In the new system, `.eslintrc*` is no longer used. `eslint.config.js` would be the default config file name.
In eslint `v8`, the legacy system (`.eslintrc*`) would still be supported, while in eslint `v9`, only the new system would be supported.

And from [`v8.23.0`](https://github.com/eslint/eslint/releases/tag/v8.23.0), eslint CLI starts to look up `eslint.config.js`.
**So, if your eslint is `>=8.23.0`, you're 100% ready to use the new config system.**

[official docs](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new).

### Plugin

The default export of `eslint-plugin-vibeast` is a plugin object.

```js
const vibeast = require('eslint-plugin-vibeast');
const globals = require('globals');

module.exports = [
  …
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
      vibeast,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      // ... any rules you want
     },
    // ... others are omitted for brevity
  },
  …
];
```

## List of supported rules

<!-- begin auto-generated rules list -->

🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).\
💡 Manually fixable by [editor suggestions](https://eslint.org/docs/latest/use/core-concepts#rule-suggestions).\
❌ Deprecated.

| Name                                                                                         | Description                                                                                                                                  | 🔧 | 💡 | ❌  |
| :------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- | :- | :- | :- |
| [no-object-literal-types](docs/rules/no-object-literal-types.md)                                     | Enforces creating an interface or type for props                                                                                                 |  🔧  |    |    |    |    |


## License

`eslint-plugin-vibeast` is licensed under the [MIT License](https://opensource.org/licenses/mit-license.php).
