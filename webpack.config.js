const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "mikechabot";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
  });

  const merge = webpackMerge({
    customizeArray: webpackMerge.unique(
      "plugins",
      ["HtmlWebpackPlugin"],
      (plugin) => plugin.constructor && plugin.constructor.name
    ),
  });

  const isLocal = webpackConfigEnv && webpackConfigEnv.isLocal === "true";

  return merge(
    {
      plugins: [
        new HtmlWebpackPlugin({
          inject: false,
          template: "src/index.ejs",
          templateParameters: {
            isLocal,
            orgName,
          },
        }),
        new CopyPlugin({
          patterns: [
            {
              from: isLocal ? "importmap.dev.json" : "importmap.json",
              to: "importmap.json",
            },
          ],
        }),
      ],
    },
    defaultConfig,
    {
      // modify the webpack config however you'd like to by adding to this object
    }
  );
};
