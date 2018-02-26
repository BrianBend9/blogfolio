/* eslint-disable comma-dangle */

require('dotenv').config();

const commonConfig = require('./webpack.config.common');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const browserSyncServer = new BrowserSyncPlugin({
  host: '0.0.0.0',
  port: process.env.DEVSERVER_PORT,
  proxy: `http://0.0.0.0:${process.env.PORT}`,
  files: ['assets/app/*.html', 'assets/app/*.css', 'assets/app/*.js', 'assets/app/*.map'],
  open: false
});

// Create development config based on common config file (i.e. merging properties)

// Allow passing of custom command-line arguemnts to config using env param
// (see https://github.com/webpack/webpack/issues/2254#issuecomment-318364254)

module.exports = env => Object.assign(
  {},

  commonConfig,

  // Add devtool, and chunkFilename properties to config
  { devtool: 'cheap-module-eval-source-map' },

  {
    output: {
      ...commonConfig.output,
      chunkFilename: '[id].chunk.js',
    }
  },

  // Add loaders to config
  commonConfig.module.rules.push(
    {
      test: /\.ts$/,
      loaders: [
        'awesome-typescript-loader',
        'angular2-template-loader',
      ]
    },

    {
      test: /\.(ts|js)$/,
      loader: 'angular-router-loader',
    }
  ),

  // Do not add BrowserSync dev server if only building assets (i.e. buildOnly flag is passed
  // from command-line)
  env.buildOnly ? null : commonConfig.plugins.push(browserSyncServer)
);
