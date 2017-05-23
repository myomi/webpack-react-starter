const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const Stylelint = require('stylelint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

const DIST_VENDOR_JS = 'vendor/js/';

/*
 * settings for external libraries
 */
const EXTERNALS = [
    {
        name: 'react',
        object: 'React',
        dir: 'node_modules/react/dist',
        filename: 'react.js'
    },
    {
        name: 'react-dom',
        object: 'ReactDOM',
        dir: 'node_modules/react-dom/dist',
        filename: 'react-dom.js'
    }
];

const extractSass = new ExtractTextPlugin({
    filename: 'app.css'
});

const tsChecker = new CheckerPlugin();

const stylelint = new Stylelint();

const copyVendor = new CopyWebpackPlugin(EXTERNALS.map(e => {
    return {
        from: path.join(e.dir, e.filename),
        to: DIST_VENDOR_JS
    };
}));

const copyStatic = new CopyWebpackPlugin([
    {
        from: 'src/images',
        to: '.'
    }
]);

const html = new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'src/index.html',
    hash: true
});

const include = new HtmlWebpackIncludeAssetsPlugin({
    assets: EXTERNALS.map(e => {
        return path.join(DIST_VENDOR_JS, e.filename);
    }),
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
                        options: {
                            configFileName: 'tsconfig.json'
                        }
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
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }],
                    // use style-loader in development
                    fallback: 'style-loader'
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
            },
            {
                test: /.(jpg|jpeg|png)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        stylelint,
        extractSass,
        tsChecker,
        copyVendor,
        copyStatic,
        html,
        include
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    externals: {} /* use EXTERNALS */,
    devtool: 'source-map'
};

EXTERNALS.forEach(e => {
    module.exports.externals[e.name] = e.object;
});