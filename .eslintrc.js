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
    'max-len': 0,
    'no-console': 0,
    'no-nested-ternary': 0,
    'prefer-destructuring': 0,
    'import/order': false,
    'class-methods-use-this': 0,
    'no-param-reassign': 0,
    'vue/no-parsing-error': [2, {
      'invalid-first-character-of-tag-name': 0,
    }],
    eqeqeq: 0,
    'no-underscore-dangle': 0,
    'no-plusplus': 0,
  },
  parserOptions: {
    parser: 'typescript-eslint-parser',
    jsx: true,
    useJSXTextNode: true,
  },
};
