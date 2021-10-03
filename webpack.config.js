// módulo para gestionar rutas
const path = require('path');
const webpack = require('webpack');

// modulo para añador toda ña configuración de webpack a index.html
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// se exporta el modulo de configuración
module.exports = {
  // punto de partida de la aplicación web
  entry: './src/app/index.js',

  // ruta donde se quiere generar el archivo tras el build
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    // se define mediante una regex el tipo de archivo que se va a manejar y se especifica con que loader ser va a utilizar
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.html$/,
        use: 'raw-loader',
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/public/index.html' }), new ExtractTextPlugin('styles.css')],

  // para configurar la carpeta base del proyecto
  devServer: {
    contentBase: './src/public',
  },
};
