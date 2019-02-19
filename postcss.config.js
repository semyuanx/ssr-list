/* eslint-disable */
const px2rem = require('postcss-pxtorem');

module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-flexibility'),
    px2rem({
      selectorBlackList: [/^html$/, /^\.fm-/, /follow-setup/, /fmcomponent/],
      mediaQuery: false,
      rootValue: 24,
      propList: ['*'], // ['font', 'font-size', 'line-height', 'letter-spacing'],
    }),
  ],
};
