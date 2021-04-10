const path = require("path");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./src/bundles/dev.ts",
  output: {
    filename: "vida.dev.min.js",
    path: path.resolve(__dirname, "bundles"),
    library: "vida",
    libraryExport: "default",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: "ts-loader" }],
  },
};
