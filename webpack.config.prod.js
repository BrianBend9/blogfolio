const { AngularCompilerPlugin } = require('@ngtools/webpack');
const path = require('path');
const webpack = require('webpack');

const commonConfig = require('./webpack.config.common');

// Create production config based on common config file (i.e. merging properties)
module.exports = Object.assign(
    {},

    commonConfig,

    // Adding chunkFilename property to config
    {output: 
        {
            ...commonConfig.output,
            chunkFilename: '[id].[hash].chunk.js'
        } 
    },

    // Adding loader and plugins for production to config
    commonConfig.module.rules.push(
        {
            test: /\.ts$/,
            loaders: [
                'angular2-template-loader',
                'angular2-router-loader?aot=true&genDir=public/js/app'
            ]
        },
        // Loader required for ahead of time (AoT) compilation
        {
            test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
            loader: '@ngtools/webpack'
        }
    ),

    commonConfig.plugins.push(
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({ sourceMap: false }),
        new AngularCompilerPlugin({
            tsConfigPath: path.join(__dirname, 'tsconfig.aot.json'),
            entryModule: path.join(__dirname, 'assets', 'app', 'app.module#AppModule')
        })
    )
);
