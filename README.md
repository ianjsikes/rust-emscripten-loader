# Rust WebAssembly loader

[![npm](https://img.shields.io/npm/v/rust-wasm-loader.svg)](https://www.npmjs.com/package/rust-wasm-loader)

## Usage

This is a simple Webpack loader that shells out to cargo to build a Rust project targeting WebAssembly. See [this post](https://users.rust-lang.org/t/compiling-to-the-web-with-rust-and-emscripten/7627) for
more details on using Rust to target the web.

To use it, first install the package:

```bash
$ npm install rust-wasm-loader
```

Configure the loader in your Webpack config:

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.rs$/,
        use: {
          loader: 'rust-wasm-loader',
          options: {
            // Path to your 'build' or 'dist' directory relative to project root
            path: 'build/',
          }
        }
      },
      // ...
    ]
  }
}
```

Note: if you are using `file-loader`, make sure to add `.wasm` to the test field, otherwise the module will not be copied! (e.g. `test: /\.(wasm|jpg|jpeg|png|gif|svg|eot|ttf|woff|woff2)$/i,`).

Make sure you have the `cargo`, `rustc`, and (optionally) `emsdk` binaries somewhere in your `PATH`.
Require and initialize the wasm module:

```js
const wasm = require('./main.rs')
wasm.then(module => {
  // Use your module here
  console.log(module.doub(21))
})
```

or with async/await:

```js
async function loadwasm() {
  const lib = await require('./lib.rs');
  // Use your module here
  console.log(lib.doub(21));
}
loadwasm();
```

### Configuration

The following options can be added to the Webpack loader query:

| Name | Description | Required | Default |
| ---- | ----------- | -------- | ------- |
| `release` | Whether or not to pass the `--release` flag to cargo | false | false |
| `path` | Path to your webpack output folder relative to project root | true | '' |
| `target` | Allows one to specify `wasm32-unknown-emscripten` as build target | false | 'wasm32-unknown-unknown' |

### Example

Check out the [example](example) directory for a simple Hello World example.

This project is based off of [rust-emscripten-loader](https://github.com/mrdziuban/rust-emscripten-loader)
by [mrdziuban](https://github.com/mrdziuban).
