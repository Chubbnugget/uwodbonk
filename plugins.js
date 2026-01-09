import clsx from 'clsx';

const pluginConfig = [
  [
    function disableExpensiveBundlerOptimizationPlugin() {
      return {
        name: 'disable-expensive-bundler-optimizations',
        configureWebpack(config, isServer) {
          return {
            optimization: {
              // See https://github.com/facebook/docusaurus/discussions/11199
              concatenateModules: false,
            },
          };
        },
      };
    },
    {},
  ],
]

export default pluginConfig;