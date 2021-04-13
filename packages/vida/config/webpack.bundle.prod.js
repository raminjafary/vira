const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  mode: "production",
  devtool: "inline-source-map",
  entry: path.resolve(__dirname, "../src/bundles/main.ts"),
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
    new HtmlWebpackPlugin({
      // inject: false ,
      scriptLoading: "blocking",
      title: "Development",
      filename: "../playground/bundle.[name].html",
      minify: false,
      template: path.resolve(__dirname, "../src/dev/bundle.prod.ejs"),
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
