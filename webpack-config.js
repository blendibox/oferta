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
      {
      test: /\.mp4$/,
      loader: 'url?limit=10000&mimetype=video/mp4'
      }
        ],
    }],
  },
};