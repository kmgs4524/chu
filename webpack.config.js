var webpack = require("webpack");
var LiveReloadPlugin = require('webpack-livereload-plugin');
var liveReloadOption = {
  appendScriptTag: true
};
module.exports = {
  watch: true,
  devtool: 'source-map',  
  entry: {
    app: ["./entry.js"]
  },
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: 'babel-loader',
    }]
  },
  devServer: {
    hot: true
  },
  plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new LiveReloadPlugin(liveReloadOption)
  ]
};