
const path = require('path');
const dayjs = require('dayjs');
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
  svgRule.uses.clear();

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

const configDefinePlugin = (config) => {
  config.plugin('define')
  .tap(args => {
    args[0]['process.env']['COMPILE_TIME'] = JSON.stringify(dayjs().format('YYYY-MM-DD-HH-mm'));
    return args;
  })
}


module.exports = {
  publicPath: '/trading-strategy/',
  productionSourceMap: process.env.MODE_ENV !== 'production',
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
    configDefinePlugin(config);
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
      importWorkboxFrom: 'local',
      // offlineGoogleAnalytics: false,
      excludeChunks: [/trading-strategy\//, /\.html$/],
      exclude: [/\.map$/, /^manifest.*\.js(?:on)?$/, /\.html$/],
      swSrc: 'public/service-worker.js',
      include: [/\.png?/, /\.jpg?/, /\.svg?/, /\.js$/, /\.css$/, /cdn\./]
    },
    workboxPluginMode: 'InjectManifest'
  },
  transpileDependencies: [/fmcomponents/, /element-ui/],
};
