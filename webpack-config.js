module.exports = {
  //...
  experiments: {
    topLevelAwait: true,
  },
    module: {
    rules: [{ 
      test: /\.xml$/i, 
      use: [
          {
            loader: 'raw-loader',
            options: {
              esModule: false,
            },
          },
        ],
    }],
  },
};