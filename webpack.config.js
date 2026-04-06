/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = function(_env, argv) {
  const isProduction = argv.mode === 'production';
  // const cssLoders = isProduction ? MiniCssExtractPlugin.loader : ['style-loader', 'css-loader', 'sass-loader'];

  return {
    // entry: './src/index.js',
    entry: {
      index: {
        import: './src/index.js',
        dependOn: 'shared',
      },
      shared: 'lodash',
    },
    output: {
      // filename: 'main.[chunkhash].js',
      chunkFilename: '[name].[chunkhash].chunk.js',
      path: path.resolve(__dirname, 'build'),
      filename: 'assets/js/[name].[contenthash:8].js',
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'build'),
      },
      port: argv.port || 4228,
    },

    module: {
      // exclude node_modules
      rules: [
        {
          test: /\.[jt]sx?$/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              envName: argv.mode
            }
          },
          include: path.join(__dirname, 'src'),
          exclude: /node_modules/,
        },
        {
          // Preprocess our own .css .scss files
          test: /\.(css|scss)$/,
          // exclude: /node_modules/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(jpg|jpeg|png|gif|webp)$/,
          use: 'file-loader'
        },
        {
          test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
          use: 'file-loader'
        },
        {
          test: /\.html$/,
          use: 'html-loader'
        },
        {
          test: /\.(mp4|webm)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        },
        {
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
        },
      ],
    },
    // pass all js files through Babel
    resolve: {
      modules: ['src', 'node_modules'],
      extensions: ['*', '.js', '.jsx', '.react.js', '.ts', '.tsx', '.css', '.scss'],
      mainFields: ['browser', 'jsnext:main', 'main']
    },

    plugins: [
      isProduction &&
        new MiniCssExtractPlugin({
          filename: 'assets/css/[name].[contenthash:8].css',
          chunkFilename: 'assets/css/[name].[contenthash:8].chunk.css'
        }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public', 'index.html'),
        bootstrapPath: path.join(
          __dirname,
          'bootstrap/dist/css/bootstrap.css'
        ),
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
        inject: true
      })
    ].filter(Boolean),

    optimization: {
      minimize: isProduction,
      splitChunks: {
        chunks: 'all',
        minSize: 20000, 
        minRemainingSize: 0,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
      // splitChunks: {
      //   chunks: "all",
      //   minSize: 0,
      //   maxInitialRequests: 20,
      //   maxAsyncRequests: 20,
      //   cacheGroups: {
      //     vendors: {
      //       test: /[\\/]node_modules[\\/]/,
      //       name(module, chunks, cacheGroupKey) {
      //         const packageName = module.context.match(
      //           /[\\/]node_modules[\\/](.*?)([\\/]|$)/
      //         )[1];
      //         return `${cacheGroupKey}.${packageName.replace("@", "")}`;
      //       }
      //     },
      //     common: {
      //       minChunks: 2,
      //       priority: -10
      //     }
      //   }
      // },
      // runtimeChunk: "single"
    },

    performance: {
      assetFilter: (assetFilename) => !(/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename)),
    },

  };
}
