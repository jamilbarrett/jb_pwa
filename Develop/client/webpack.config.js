const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html', 
        chunks: ['main'], 
      }),
      new WebpackPwaManifest({
        name: 'Edit-le-text',
        short_name: 'Letext',
        description: 'Revolutinary Note Editor',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: path.resolve('src/assets/icon.png'), 
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('icons'),
          },
        ],
      }),
      new InjectManifest({
        swSrc: './src/service-worker.js', 
        swDest: 'service-worker.js', 
      }), 
    ],
    module: {
      rules: [
        {
          test: /\.css$/, 
          use: ['style-loader', 'css-loader'],
        }, 
        {
          test: /\.js$/, 
          exclude: /node_modules/, 
          use: {
            loader: 'babel-loader', 
            options: {
              presets: ['@babel/preset-env'], 
            },
          },
        }, 
      ],
    },
  };
};
