const webpack = require("webpack");
const path = require("path");

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "analytics-framework.js"
  },
  module: {
    rules: [
      {
        test: /src\/\*\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      }
    ]
  }
};

module.exports = config;
