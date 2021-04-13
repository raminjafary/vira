const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: path.resolve(__dirname, "../src/bundles/dev.ts"),
  output: {
    filename: "vida.dev.min.js",
    path: path.resolve(__dirname, "../bundles"),
    library: "vida",
    libraryExport: "default",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // inject: false,
      scriptLoading: "blocking",
      title: "Development",
      filename: "../playground/bundle.dev.html",
      minify: false,
      template: path.resolve(__dirname, "../src/dev/bundle.dev.ejs"),
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
    rules: [{ test: /\.tsx?$/, loader: "ts-loader" }],
  },
};
