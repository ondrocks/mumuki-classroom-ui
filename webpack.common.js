process.env.PORT = process.env.PORT || 3001;
process.env.TENANT = process.env.TENANT || 'central';

const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

//Set up config file
require('fs').copyFileSync(`config/${process.env.NODE_ENV}.js`, 'src/scripts/config/config.js');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './scripts/app.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ["angularjs-annotate"]
          }
        }]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { sourceMap: true } },
          "sass-loader"
        ]
      },
      {
        test: /\.pug?$|\.jade$/,
        use:
          [
            "file-loader?name=[path][name].html",
            "extract-loader",
            "html-loader",
            "pug-html-loader"]
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
        use:
          [{
            loader: "file-loader",
            options: {
              name: '[name].[ext]',
              outputPath: "./styles/fonts",
              publicPath: "./fonts"
            },
          }]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles/main.css"
    }),
    new CopyWebpackPlugin([
      { from: 'assets', to: 'assets' },
      { from: 'images', to: 'images' }
    ]),
    new CompressionPlugin()
  ]
};
