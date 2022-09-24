module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'object-curly-newline': 0,
    'react/prop-types': 0,
    'react/button-has-type': 0,
    'no-underscore-dangle': 0,
    'react/no-array-index-key': 0,
    'no-unused-vars': 0,
    'import/extensions': 0,
    'consistent-return': 0,
    'arrow-body-style': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'import/no-unresolved': 0,
    'no-console': 1,
    'no-continue': 0,
    'no-shadow': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/heading-has-content': 0,
    camelcase: 0,
    'no-param-reassign': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'prefer-destructuring': 0,
  },
};
