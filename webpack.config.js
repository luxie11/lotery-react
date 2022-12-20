const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    alias: {
      react: path.join(__dirname, 'node_modules', 'react'),
    },
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
        {
          test: /\.(js|jsx)$/,
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: ['file-loader']
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          use: ['file-loader'],
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public/css',
          to: '/css'
        }
      ]
    }),
    new HtmlWebPackPlugin({
      fileName: "index.html",
      template: "public/index.html" 
    }),
  ],
};