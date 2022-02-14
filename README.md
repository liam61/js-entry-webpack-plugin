<div align="center">
  <h1>JS Entry Webpack Plugin</h1>
  <p>creates webpack bundles into your js entry</p>
</div>

<h2 align="center">Install</h2>

```bash
  yarn add js-entry-webpack-plugin -D
```

```bash
  npm i js-entry-webpack-plugin -D
```

This is a [webpack](http://webpack.js.org/) plugin that creates webpack bundles into your js entry. This is especially useful for `Micro Frontend Project` which uses `index.js` as its `entry`

This plugin is inspired by [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)

<h2 align="center">Usage</h2>

The plugin will insert a fragment script at the beginning of you js entry, which will create a link tag to load css source. And if you don't have `extracted css entry file`, it wouldn't bother you

NOTE: do not use `html-webpack-plugin` at the same time

**webpack.config.js**

```js
import JSEntryWebpackPlugin from 'js-entry-webpack-plugin'

module.exports = {
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js',
  },
  plugins: [new JSEntryWebpackPlugin()],
}
```

This will insert a fragment script `dist/index.js` containing the following

```js
;(e => {
  var t = document.createElement('link')
  ;(t.href = e), (t.rel = 'stylesheet'), (t.type = 'text/css'), document.head.appendChild(t)
})('your-css-entry.css')
;(() => {
  /* dist source */
})()
```

<h2 align="center">Options</h2>

You can pass a hash of configuration options to `js-entry-webpack-plugin`.
Allowed values are as follows:

|       Name       |    Type    |          Default           | Description   |
| :--------------: | :--------: | :------------------------: | :------------ |
|  **`filename`**  | `{String}` |       `config.entry`       | Js entry name |
|  **`template`**  | `{String}` |    `config.output.path`    | Js entry path |
| **`publicPath`** | `{String}` | `config.output.publicPath` | Public path   |

Here's an example webpack config illustrating how to use these options

**webpack.config.js**

```js
{
  entry: 'index.js',
  output: {
    path: __dirname + '/custom',
    filename: 'index_bundle.js'
  },
  plugins: [
    new JSEntryWebpackPlugin({
      filename: 'main.js',
      template: __dirname + '/custom',
      publicPath: 'https://www.custom-cdn.com'

    })
  ]
}
```
