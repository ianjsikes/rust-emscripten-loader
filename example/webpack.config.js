module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/build',
  },
  module: {
    rules: [
      {
        test: /\.rs$/,
        use: {
          loader: 'rust-wasm-loader',
          options: {
            path: '',
          }
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: "file-loader?name=[name].[ext]"
        }
      }
    ]
  },
  externals: {
    'fs': true,
    'path': true,
  },
}
