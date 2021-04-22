const path = require("path");
// const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  mode: "production",
  devtool: "inline-source-map",
  entry: {
    core: path.resolve(__dirname, "../src/bundles/core.ts"),
    full: path.resolve(__dirname, "../src/bundles/full.ts"),
  },
  output: {
    filename: "vida.[name].min.js",
    path: path.resolve(__dirname, "../bundles"),
    library: "vida",
    libraryExport: "default",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    // new CompressionPlugin({
    //     algorithm: "gzip",
    //   }),
  ],
  module: {
    rules: [{ test: /\.tsx?$/, loader: "ts-loader" }],
  },
};
