module.exports = {
  root: true,
  env: {
    node: true,
  },
  globals: {
    Promise: "readonly"
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'import',
  ],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: "./"
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',

  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/prefer-default-export': 0,
    'import/extensions': 0,
    'arrow-body-style': 0,
    'max-classes-per-file': 0,
    'quotes': ["warn", "double"],
    // note you must disable the base rule as it can report incorrect errors
    'no-shadow': 'off',
    'class-methods-use-this': 0,
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // Your TypeScript files extension
      parserOptions: {
        project: [
          './tsconfig.json',
          './ormconfig.js'
        ], // Specify it only for TypeScript files
      },
    }
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts'],
      },
      typescript: {}
    },
  },
};
