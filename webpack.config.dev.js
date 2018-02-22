require('dotenv').config()
const path = require('path');
const commonConfig = require('./webpack.config.common');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

// Create development config based on common config file (i.e. merging properties)
module.exports = Object.assign(
    {}, 

    commonConfig,

    // Adding devtool, and chunkFilename properties to config
    {devtool: 'cheap-module-eval-source-map'},

    {output: 
        {
            ...commonConfig.output, 
            chunkFilename: "[id].chunk.js"
        }
    },

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
            loaders: [
                'angular-router-loader'
            ]
        }
    ),

    commonConfig.plugins.push(
        new BrowserSyncPlugin({
            host: '0.0.0.0',
            port: process.env.DEVSERVER_PORT,
            proxy: `http://0.0.0.0:${process.env.PORT}`,
            files: ['assets/app/*.html, assets/app/*.css']
        })
    )

);
