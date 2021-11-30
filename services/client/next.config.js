const { ESBuildMinifyPlugin } = import("esbuild-loader");

function useEsbuildMinify(config, options) {
  const terserIndex = config.optimization.minimizer.findIndex(
    (minimizer) => minimizer.constructor.name === "TerserPlugin",
  );
  if (terserIndex > -1) {
    config.optimization.minimizer.splice(terserIndex, 1, new ESBuildMinifyPlugin(options));
  }
}

function useEsbuildLoader(config, options) {
  const jsLoader = config.module.rules.find((rule) => rule.test && rule.test.test(/\.ts?$/));

  if (jsLoader) {
    jsLoader.use.loader = "esbuild-loader";
    jsLoader.use.options = options;
  }
}

module.exports = {
  webpackDevMiddleware: (config) => {
    // eslint-disable-next-line
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };

    return config;
  },

  // https://webpack.js.org/guides/asset-modules/
  webpack: (config, { webpack }) => {
    useEsbuildMinify(config, {
      target: "esnext",
      css: true,
    });

    useEsbuildLoader(config, {
      loader: "tsx",
      target: "esnext",
      // tsconfigRaw: import("./tsconfig.json"),
    });

    return config;
  },
};
