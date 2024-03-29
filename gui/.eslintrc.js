module.exports = {
  root: true,

  env: {
    node: true,
  },

  parserOptions: {
    parser: 'babel-eslint',
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/max-attributes-per-line': [ 'error', {
      'singleline': 4,
      'multiline': {
        'max': 1,
        'allowFirstLine': false,
      },
    } ],
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],

  'extends': [
    'plugin:vue/strongly-recommended',
    'eslint:recommended',
  ],
}
