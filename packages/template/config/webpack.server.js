const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");

const server = {
  mode: "development",
  target: "node",
  entry: path.resolve(__dirname, "../src/server/server.tsx"),
  output: {
    filename: "server.bundle.js",
    path: path.resolve(__dirname, "../dist"),
  },
  module: {
    rules: [],
  },
  externals: [nodeExternals()],
};

module.exports = merge(common, server);
