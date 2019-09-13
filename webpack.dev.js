const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
    mode: 'development',
    target: "electron-main",
    entry: {
        main: ['@babel/polyfill', './src/main.ts'],
        preload: './src/preload.ts',
        renderer: './src/renderer.ts',
    },
    output: {
        publicPath: ASSET_PATH,
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].js",
    },
    devtool: 'inline-source-map',

    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,

                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                }
            },
        ]
    },
    resolve: {
        extensions: [ '.ts', '.js' ]
    },
    plugins: [
        new CopyPlugin([
            { from: 'src/index.html', to: '' },
        ]),
    ],

};
