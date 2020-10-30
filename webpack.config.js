const path = require("path");
const DefinePlugin = require("webpack").DefinePlugin;
const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const importMapPath = path.join(__dirname, "/import-maps");
const srcPath = path.join(__dirname, "/src");

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

  const {
    output: { path: distPath },
  } = defaultConfig;

  const rootConfigDistPath = path.join(distPath, "root-config");
  const coreDistPath = path.join(distPath, "core");

  return [
    merge(
      {
        plugins: [
          new HtmlWebpackPlugin({
            inject: false,
            template: path.join(srcPath, "index.ejs"),
            templateParameters: {
              isLocal,
              orgName,
            },
          }),
          new DefinePlugin({
            isLocal,
          }),
          new CopyPlugin({
            patterns: [
              {
                from: isLocal
                  ? path.join(importMapPath, "modules.dev.json")
                  : path.join(importMapPath, "modules.json"),
                to: path.join(rootConfigDistPath, "modules.json"),
              },
              {
                from: path.join(importMapPath, "common.json"),
              },
            ],
          }),
        ],
      },
      defaultConfig,
      {
        output: {
          filename: "mikechabot-root-config.js",
          libraryTarget: "system",
          path: rootConfigDistPath,
          jsonpFunction: "webpackJsonp_root-config",
        },
      }
    ),
  ];
};
