const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { CheckerPlugin } = require('awesome-typescript-loader');

const tsChecker = new CheckerPlugin();

module.exports = {
    target: 'node',
    entry: './test/tests.ts',
    output: {
        path: path.resolve(__dirname, 'dist', 'test'),
        filename: 'tests.js'
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
                            configFileName: 'tsconfig.test.json'
                        }
                    },
                    {
                        loader: 'tslint-loader',
                        options: {
                            emitErrors: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        tsChecker
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    externals: [nodeExternals()],
};
