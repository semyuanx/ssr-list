const px2rem = require('postcss-pxtorem');

module.exports = {
  plugins: [
    // eslint-disable-next-line
    require('autoprefixer'),
    px2rem({
      rootValue: 24,
      propList: ['*'], // ['font', 'font-size', 'line-height', 'letter-spacing'],
    }),
  ],
};
