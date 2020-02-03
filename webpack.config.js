module.exports = {
  entry: ["@babel/polyfill", "@babel/core", './app/index.js'],
  output: {
    path: __dirname,
    filename: './bundle.js'
  },
  context: __dirname,
  devtool: 'source-maps',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
    ]
  }
}
