const path = require('path');
const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV || 'development';
const debug = NODE_ENV === 'development' ? true : false;

module.exports = {
    entry: './src/index',
    output: {
        filename: 'scripts.min.js',
        path:__dirname
    },
    cache: true,
    watchOptions: {
        aggregateTimeout: 100
    },
    watch: debug,
    devtool: null, //debug ? "cheap-inline-module-source-map" : null,
    plugins: [
        new webpack.DllReferencePlugin({
            context: path.join(__dirname, "src"),
            manifest: require("./dll/dependencies-manifest.json")
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: [
                    path.join(__dirname, 'src')
                ],
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react'],
                    plugins: ['transform-runtime', 'transform-object-rest-spread']
                }
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            }, // use ! to chain loaders
        ]
    }
};

if (!debug) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            warnings: false,
            drop_console: true,
            unsafe: true
        })
    );
}