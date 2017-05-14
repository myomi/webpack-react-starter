const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { CheckerPlugin } = require('awesome-typescript-loader')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "app.css"
});

const tsChecker = new CheckerPlugin();

const copy = new CopyWebpackPlugin([
    { from: 'node_modules/react/dist/react.js', to: 'vendor/js/' },
    { from: 'node_modules/react-dom/dist/react-dom.js', to: 'vendor/js/' }
]);

const html = new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'src/index.html',
    hash: true
});

const include = new HtmlWebpackIncludeAssetsPlugin({
    assets: [
        'vendor/js/react.js',
        'vendor/js/react-dom.js'
    ],
    append: false,
    hash: true
});

module.exports = {
    entry: './src/ts/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                    },
                    {
                        loader: 'tslint-loader',
                        options: {
                            emitErrors: true
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(eot|woff(2)?)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'image/svg+xml'
                }
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'application/octet-stream'
                }
            }
        ]
    },
    plugins: [
        extractSass,
        tsChecker,
        copy,
        html,
        include
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'

    },
    devtool: "source-map"
};