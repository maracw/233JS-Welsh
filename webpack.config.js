const webpack = require('webpack');
const path = require('path');
const OAuth = require('oauth');
const htmlWebpackPlugin = require("html-webpack-plugin");
const copyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// this loads all of the variables in the .env file
// they're available in your code as process.env.KEY
require('dotenv').config();

/**
 * flag Used to check if the environment is production or not
*/
const isProduction = (process.env.NODE_ENV === 'production');

/**
* Include hash to filenames for cache busting - only at production
*/
const fileNamePrefix = isProduction? '[chunkhash].' : '';

module.exports = {
    mode: !isProduction ? 'development': 'production',
    entry: {
      home: './src/js/home.js',
      audio: './src/js/audio.js',
      addAWord: './src/js/addAWord.js'
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: fileNamePrefix + '[name].js',
      assetModuleFilename: "assets/[name][ext]",
      clean: true,
    },
    target: 'web',
    devServer: { 
      static: "./dist"
    }, 
    /* no separate source map files in production */
    devtool: !isProduction ? 'source-map' : 'inline-source-map', 
    module: {
      rules: [	
        { 
          test: /\.js$/i,
          exclude: /(node_modules)/,
          use: { 
            loader: 'babel-loader', 
            options: {
            presets: ['@babel/preset-env']
          }}
        }, 
        { 
          test: /\.css$/i, 
          /* separate js code and css in production */
          use: isProduction ?
            [ MiniCssExtractPlugin.loader, 'css-loader']	:
            [ 'style-loader', 'css-loader']		
        },
        { 
            test: /.s[ac]ss$/i, 
            use: isProduction ?
              [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']	:
              [ 'style-loader', 'css-loader' , 'sass-loader']		
        },
        {  
          test: /\.(svg|eot|ttf|woff|woff2)$/i,  
          type: "asset/resource",
        },
        {
          test: /\.(png|jpg|gif)$/i,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      new htmlWebpackPlugin({
        template: path.resolve(__dirname, "./src/index.html"),
        chunks: ["home"],
        inject: "body",
        filename: "index.html",
      }),
      new htmlWebpackPlugin({
        template: path.resolve(__dirname, "./src/audio.html"),
        chunks: ["audio"],
        inject: "body",
        filename: "audio.html",
      }),
      new htmlWebpackPlugin({
        template: path.resolve(__dirname, "./src/addAWord.html"),
        chunks: ["addAWord"],
        inject: "body",
        filename: "addAWord.html",
      }),

      new copyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "src/assets/images"),
            to: path.resolve(__dirname, "dist/assets/images"),
          },
        ],
      }),
      //SPEECH_URL and SPEECH_KEY are the welsh text to speech api values
      /* app uses global SPEECH_URL rather than process.env.SPEECH_URL */
      new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        SPEECH_URL: JSON.stringify(process.env.SPEECH_URL),
        SPEECH_KEY: JSON.stringify(process.env.SPEECH_KEY),
        ICON_URL: JSON.stringify(process.env.ICON_URL),
        ICON_KEY: JSON.stringify(process.env.ICON_KEY),
        ICON_SECRET: JSON.stringify(process.env.ICON_SECRET)
      }),
    ],
    /* separates js (and css) that is shared between bundles - allows browser to cache */
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
}

/**
 * Production only plugins
 */
 if(isProduction) {
  module.exports.plugins.push(
    new MiniCssExtractPlugin({
      filename: fileNamePrefix + "[name].css",
    })
  );
};
  