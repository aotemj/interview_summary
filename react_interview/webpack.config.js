const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: path.join(__dirname, './src/main.js'),
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  devServer: {
    port: 3000,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}
