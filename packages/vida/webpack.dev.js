const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {},
  entry: "./src/dev/index.tsx",
  output: {
    filename: "dev.js",
    path: path.resolve(__dirname, "playground"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // inject: false,
      scriptLoading: "blocking",
      title: "Development",
      filename: "dev.html",
      minify: false,
      template: path.resolve(__dirname, "src/dev/index.ejs"),
      meta: {
        charset: { charset: "utf-8" },
        viewport: "width=device-width, initial-scale=1",
      },
      templateParameters: (compilation, assets, assetTags, options) => {
        return {
          compilation,
          webpackConfig: compilation.options,
          htmlWebpackPlugin: {
            tags: assetTags,
          },
          files: assets,
          options,
        };
      },
    }),
  ],
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
    ],
  },
};
