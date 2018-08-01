const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  entry: './src/main.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader', 'angular2-template-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(html|css)$/,
        loader: 'raw-loader'
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        output: {
          ascii_only: true,
          beautify: false
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.DefinePlugin({
      // global app config object
      config: JSON.stringify({
        apiUrl: 'http://localhost:4000'
      })
    })
    
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    
    minimizer: [
      new UglifyJsPlugin()
    ],
    runtimeChunk: true
  },
  devServer: {
    historyApiFallback: true
  }
};