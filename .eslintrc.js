module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/order': false,
    'class-methods-use-this': 0,
    'no-param-reassign': 0,
  },
  parserOptions: {
    parser: 'typescript-eslint-parser',
    jsx: true,
    useJSXTextNode: true,
  },
};
