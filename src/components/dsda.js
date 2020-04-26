const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const HtmlWebPackPlugin = require("html-webpack-plugin")
module.exports = {
    entry: {
        server: './server.js',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js'
    },
    target: 'node',
    node: {
        // Need this when working with express, otherwise the build fails
        __dirname: false,   // if you don't put this is, __dirname
        __filename: false,  // and __filename return blank or /
    },
    externals: [nodeExternals()], // Need this to avoid error when working with Express
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'file-loader?name=[name].[ext]',
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets:['es2015','react']
                    }
                }],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.script\.js$/,
                use: [
                    {
                        loader: 'script-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ]
            },
            {
                // Loads the javacript into html template provided.
                // Entry point is set below in HtmlWebPackPlugin in Plugins
                test: /\.html$/,
                use: [{loader: "html-loader"}]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(jpg|jpeg|gif|png|svg|webp)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: './images',
                            name: "[name].[ext]",
                        },
                    },
                ]
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                }
            }
        ]
    },
    resolve: {
        extensions: [ '.js', '.jsx', '.css', '.web.js', '.mjs', '.json', '.web.jsx'],
        modules: [
            "node_modules"
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./index.html",
            filename: "./index.html",
            excludeChunks: [ 'server' ]
        }),
        new webpack.LoaderOptionsPlugin({
            options: {}
        }),
        new webpack.NamedModulesPlugin()
    ],
    devServer: {
        historyApiFallback: true,
        contentBase: './'
    }
}