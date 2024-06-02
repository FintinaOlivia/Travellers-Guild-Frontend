const webpack = require('webpack');

module.exports = function override(config, env) {
  // Add fallbacks for Node.js core modules
  config.resolve.fallback = {
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "process": require.resolve("process/browser.js"), // Add .js extension
    "buffer": require.resolve("buffer")
  };

  // Ensure Webpack handles .mjs files
  config.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: "javascript/auto",
  });

  // Add plugins to provide necessary polyfills
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser.js', // Add .js extension
      Buffer: ['buffer', 'Buffer'],
    }),
  ]);

  return config;
};
