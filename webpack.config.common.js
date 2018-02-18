const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        'app': path.join(__dirname, 'assets', 'app', 'main.ts')
    },

    resolve: {
        extensions: ['.js', '.ts']
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.css$/,
                use: 'raw-loader'
            }
        ]
    },

    plugins: [
        // To fix warning as per https://github.com/angular/angular/issues/20357
        new webpack.ContextReplacementPlugin(
            /\@angular(\\|\/)core(\\|\/)esm5/, path.join(__dirname, 'assets', 'app')
        )
    ],

    output: {
        path: path.join(__dirname, 'public', 'js', 'app'),
        filename: 'bundle.js',
        publicPath: '/js/app/'
    }
};
