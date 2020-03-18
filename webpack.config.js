'use strict';

const webpack = require('webpack');

module.exports = {

    entry: "./js/app",

    output: {
        filename: 'app.js',
        library: 'app'
    },

    watch: false,

    resolve: {
        modules: ['node_modules'],
        extensions: ['.js']
    },

    resolveLoader: {
        modules: ['node_modules'],
        moduleExtensions: ['-loader'],
        extensions: ['.js']
    },

    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },

    optimization: {
        minimize: false
    },

    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },

};
