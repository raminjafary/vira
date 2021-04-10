const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "playground"),
  },
  entry: "./src/index.ts",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "playground"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Development",
    }),
  ],
  module: {
    rules: [{ test: /\.tsx?$/, loader: "ts-loader" }],
  },
};
