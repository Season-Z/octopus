/*
 * @Author: zhouxishun
 * @Date: 2023-09-11 14:34:50
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-09-21 18:04:45
 * @Description: 
 */
/* eslint-disable no-undef */
module.exports = {
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    // quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-debugger': 0,
    eqeqeq: 'error',
    '@typescript-eslint/no-var-requires': 'off',
    'no-async-promise-executor': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    // eslint-disable-next-line no-dupe-keys
    'indent': 'off',
    '@typescript-eslint/no-explicit-any': 'off'
  },
};
