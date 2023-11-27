import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'

const isProduction = process.env.NODE_ENV == 'production'


const stylesHandler = MiniCssExtractPlugin.loader;

const config = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(dirname(fileURLToPath(import.meta.url)), 'dist'),
    },
    devServer: {
        open: true,
        host: 'localhost',
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),

        new MiniCssExtractPlugin(),
        new CopyWebpackPlugin({
            patterns: [
              { from: './src/app/util/audio-worklet-stream-to-buffer.js', to: 'dist' },
            ],
          }),
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'babel-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.css$/i,
                use: [stylesHandler,'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [stylesHandler, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
};

export default () => {
    if (isProduction) {
        config.mode = 'production';
        
        
    } else {
        config.mode = 'development';
    }
    return config;
};
