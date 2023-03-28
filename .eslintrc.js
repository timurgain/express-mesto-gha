module.exports = {
  extends: ['airbnb-base', 'plugin:node/recommended'],
  rules: {
    // add any custom rules here
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'node/no-unpublished-require': [
      'error',
      {
        allowModules: ['electron'],
      },
    ],
  },
  env: {
    node: true,
    // add any other environments here if necessary
  },
  settings: {
    'import/core-modules': ['express', 'mongoose'],
  },
};
