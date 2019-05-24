const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require("react-app-rewire-less");
const rewireCssModules = require('react-app-rewire-css-modules');

module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], config);
  config = rewireLess(config, env);
  config = rewireCssModules(config, env);
  // with loaderOptions
  config = rewireLess.withLoaderOptions({
      modifyVars: {
        "@primary-color": "#1890ff",
      },
    })(config, env);
  return config;
}