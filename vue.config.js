
const path = require('path');
// const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');
// eslint-disable-next-line
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
  const svgRuleModule = config.module.rule('svgModule');
  // 清除已有的所有 loader。
  // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
  svgRule.uses.clear();

  // 添加要替换的 loader
  // svgRule
  //   .use('svg-inline-loader')
  //   .loader('svg-inline-loader');


  svgRule
    .test(/\.svg$/)
    .exclude
    .add(/node_modules\//)
    .end()
    .use('svg-inline-loader')
    .loader('svg-inline-loader');

  svgRuleModule
    .test(/\.svg$/)
    .include
    .add(/node_modules\//)
    .end()
    .use('file-loader')
    .loader('file-loader');
};

module.exports = {
  baseUrl: '/trading-strategy/',
  // productionSourceMap: true,
  devServer: {
    disableHostCheck: true,
  },
  lintOnSave: true,
  chainWebpack: (config) => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)));
    svgLoader(config);
    config.resolve.extensions.add('.vue').add('.js');
    if (process.env.NODE_ENV === 'production') {
      config.externals({
        vue: 'Vue',
        echarts: 'echarts',
        axios: 'axios',
        'vue-router': 'VueRouter',
      });
    }
    console.log('***********', process.env.NODE_ENV, '************');
    if (process.env.NODE_ENV === 'development') {
      config.plugin('bundle-analyze').use(BundleAnalyzerPlugin);
    }
  },
  css: {
    loaderOptions: {
      less: {
        include: [/^fmcomponents/],
      },
    },
  },
  // pwa: false,
  pwa: {
    name: '外汇优秀交易员排名__经纪商交易员操盘排行_Followme外汇社区',
    iconPaths: {
      favicon32: 'img/icons/followme-32-32.png',
      favicon16: 'img/icons/followme-32-32.png',
      appleTouchIcon: 'img/icons/followme-120-120.png',
      maskIcon: 'img/icons/followme-120-120.png',
      msTileImage: 'img/icons/followme-120-120.png',
    },
    workboxOptions: {
      importWorkboxFrom: 'local'
    }
  },
  transpileDependencies: [/fmcomponents/, /element-ui/],
};
