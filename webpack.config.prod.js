const { AngularCompilerPlugin } = require('@ngtools/webpack');
const path = require('path');
const webpack = require('webpack');

const commonConfig = require('./webpack.config.common');
const NG_ENV = process.env.NG_ENV = 'production'; 

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
        // Loader required for ahead of time (AoT) compilation
        {
            test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
            loader: '@ngtools/webpack'
        },

        {
            test: /\.ts$/,
                loaders: [
                    'angular2-template-loader',
                ]
        },
    ),

    commonConfig.plugins.push(
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({ sourceMap: false }),
        new AngularCompilerPlugin({
            tsConfigPath: path.join(__dirname, 'tsconfig.json'),
            entryModule: path.join(__dirname, 'assets', 'app', 'app.module#AppModule')
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NG_ENV': JSON.stringify(NG_ENV)
            }
        })
    )
);
