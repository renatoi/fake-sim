const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/init.js',
  output: {
    path: path.resolve(__dirname, 'example'),
    filename: 'fake.min.js'
  },
  plugins: [
    new UglifyJSPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  }
};
