/*
  Okay folks, want to learn a little bit about webpack?
*/

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
<<<<<<< HEAD
=======
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== 'production'

>>>>>>> 8d124a91603859c16671a3116591e96a149e60b5
/*
  webpack sees every file as a module.
  How to handle those files is click to loaders.
  We only have a single entry point (a .js file) and everything is required from that js file
*/

// This is our JavaScript rule that specifies what to do with .js files
const javascript = {
  test: /\.(js)$/, // see how we match anything that ends in `.js`? Cool
<<<<<<< HEAD
  // exclude: /node_modules/,
  use: [{
    loader: 'babel-loader',
    options: { presets: ['es2015'] } // this is one way of passing options
=======
  use: [{
    loader: 'babel-loader',
    options: {
      presets: ['es2015']
    } // this is one way of passing options
>>>>>>> 8d124a91603859c16671a3116591e96a149e60b5
  }],
};

/*
  This is our postCSS loader which gets fed into the next loader. I'm setting it click in it's own variable because its a didgeridog
*/

const postcss = {
  loader: 'postcss-loader',
  options: {
<<<<<<< HEAD
    plugins() { return [autoprefixer({ browsers: 'last 3 versions' })]; }
  }
};

// this is our sass/css loader. It handles files that are require('something.scss')
const styles = {
  test: /\.(scss)$/,
  // here we pass the options as query params b/c it's short.
  // remember above we used an object for each loader instead of just a string?
  // We don't just pass an array of loaders, we run them through the extract plugin so they can be outputted to their own .css file
  use: ExtractTextPlugin.extract(['css-loader?sourceMap', postcss, 'sass-loader?sourceMap'])
};

const svgs ={
=======
    sourceMap: true,
    plugins() {
      return [autoprefixer({
        browsers: 'last 3 versions'
      })];
    }
  }
};

const css = {
  loader: 'css-loader',
  options: {
    sourceMap: true
  }
}

const sass = {
  loader: 'sass-loader',
  options: {
    sourceMap: true
  },
}

// this is our sass/css loader. It handles files that are require('something.scss')
const styles = {
  test: /\.(scss)$/,
  // use: [
  //   // devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
  //   css,
  //   postcss,
  //   sass
  // ],
  use: [
    MiniCssExtractPlugin.loader,
    css,
    postcss,
    sass,
  ],
}

const svgs = {
>>>>>>> 8d124a91603859c16671a3116591e96a149e60b5
  test: /\.svg$/,
  loader: 'svg-inline-loader'

};

// We can also use plugins - this one will compress the crap out of our JS
<<<<<<< HEAD
const uglify = new webpack.optimize.UglifyJsPlugin({ // eslint-disable-line
  compress: { warnings: false }
});
=======
// const uglify = new webpack.optimize.UglifyJsPlugin({ // eslint-disable-line
//   compress: {
//     warnings: false
//   }
// });
>>>>>>> 8d124a91603859c16671a3116591e96a149e60b5

// OK - now it's time to put it all together
const config = {
  entry: {
    // we only have 1 entry, but I've set it click for multiple in the future
<<<<<<< HEAD
    App: './public/javascripts/delicious-app.js'
=======
    App: './public/javascripts/my-js.js'
>>>>>>> 8d124a91603859c16671a3116591e96a149e60b5
  },
  // we're using sourcemaps and here is where we specify which kind of sourcemap to use
  devtool: 'source-map',
  // Once things are done, we kick it out to a file.
  output: {
    // path is a built in node module
    // __dirname is a variable from node that gives us the
    path: path.resolve(__dirname, 'public', 'dist'),
    // we can use "substitutions" in file names like [name] and [hash]
    // name will be `App` because that is what we used above in our entry
    filename: '[name].bundle.js'
  },
<<<<<<< HEAD

=======
  stats: {
    // One of the two if I remember right
    entrypoints: false,
    children: false
  },
>>>>>>> 8d124a91603859c16671a3116591e96a149e60b5
  // remember we said webpack sees everthing as modules and how different loaders are responsible for different file types? Here is is where we implement them. Pass it the rules for our JS and our styles
  module: {
    rules: [javascript, styles, svgs]
  },
<<<<<<< HEAD
=======

  devServer: {
    contentBase: path.join(__dirname, '/public'), // serve your static files from here
    watchContentBase: true, // initiate a page refresh if static content changes
    proxy: [ // allows redirect of requests to webpack-dev-server to another destination
      {
        context: ['/api', '/auth'], // can have multiple
        target: 'http://localhost:8080', // server and port to redirect to
        secure: false,
      },
    ],
    port: 3030, // port webpack-dev-server listens to, defaults to 8080
    overlay: { // Shows a full-screen overlay in the browser when there are compiler errors or warnings
      warnings: false, // defaults to false
      errors: false, // defaults to false
    },
  },
>>>>>>> 8d124a91603859c16671a3116591e96a149e60b5
  // finally we pass it an array of our plugins - uncomment if you want to uglify
  // plugins: [uglify]
  plugins: [
    // here is where we tell it to output our css to a separate file
    new ExtractTextPlugin('style.css'),
<<<<<<< HEAD
  ]
=======
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
    })


  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
    ]
  }
>>>>>>> 8d124a91603859c16671a3116591e96a149e60b5
};
// webpack is cranky about some packages using a soon to be deprecated API. shhhhhhh
process.noDeprecation = true;

<<<<<<< HEAD
module.exports = config;
=======
module.exports = config;
>>>>>>> 8d124a91603859c16671a3116591e96a149e60b5
