// path
var path = require('path');
// webpack
var webpack = require('webpack');

// module
// exports
module.exports = {
  // entry components index...
  entry: [
    './components/index'
  ],
  // output to public dir
  output: {
    path: path.join(__dirname, 'public'),
    // filename is bundle.js so can src it in index.html
    filename: 'bundle.js',
    // public img, etc
    publicPath: '/'
  },
  // resolve .js
  resolve: {
    extensions: ['', '.js']
  },
  // loaders
  module: {
    loaders: [{
      // js
      test: /\.jsx?$/,
      // loaders, babel
      loaders: ['babel'],
      // includ what components all js inside
      include: path.join(__dirname, 'components')
    }]
  },
  plugins: [
    //  define plugin
    new webpack.DefinePlugin({
      // node env
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      // cosmic bucket
      'process.env.COSMIC_BUCKET': JSON.stringify(process.env.COSMIC_BUCKET)
    })
  ]
}
