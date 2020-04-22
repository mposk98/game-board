const path = require('path');

module.exports = {
    entry: './src/game-board/index.js',
    devServer: {
        stats: 'minimal',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        library: 'GameBoard',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.(less)$/,
                use: [
                    'style-loader', // creates style nodes from JS strings
                    'css-loader', // translates CSS into CommonJS
                    'less-loader', // compiles Less to CSS
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(svg|png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js'],
    },
};
