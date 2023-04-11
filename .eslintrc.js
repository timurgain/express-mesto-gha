module.exports = {
  extends: ['airbnb-base', 'plugin:node/recommended'],
  rules: {
    // add any custom rules here
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'import/no-extraneous-dependencies': [
      'error',
      // {
      //   devDependencies: false,
      //   dependencies: false
      // }
    ],
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
};
