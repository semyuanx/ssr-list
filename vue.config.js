
const path = require('path');

function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, 'src/theme/theme.less'),
      ],
    });
}

const svgLoader = (config) => {
  const svgRule = config.module.rule('svg');
  // 清除已有的所有 loader。
  // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
  svgRule.uses.clear();

  // 添加要替换的 loader
  svgRule
    .use('svg-inline-loader')
    .loader('svg-inline-loader');
};

module.exports = {
  devServer: {
    disableHostCheck: true,
  },
  lintOnSave: true,
  chainWebpack: (config) => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)));
    svgLoader(config);
  },
  css: {
    loaderOptions: {
      less: {
        include: [/^fmcomponents/],
      },
    },
  },
};
