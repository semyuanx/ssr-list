module.exports = {
  devServer: {
    disableHostCheck: true,
  },
  lintOnSave: true,
  css: {
    loaderOptions: {
      less: {
        // eslint-disable-next-line
        data: `@import "@/theme/theme.less";`
      },
    },
  },
};
