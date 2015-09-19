var webpack = require('webpack');

module.exports = {
  entry: ['./src/client/entry.js'],
  output: {
    path: __dirname + '/public/js/',
    filename: 'app.js',
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel-loader?experimental'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      }
    ]
  }
};
