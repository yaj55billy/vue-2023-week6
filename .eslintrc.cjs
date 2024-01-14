/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'airbnb-base',
    'plugin:tailwindcss/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.vue'],
      },
    },
    'import/core-modules': ['vite', '@vitejs/plugin-vue', 'vue-loading-overlay'],
  },
  rules: {
    'import/no-extraneous-dependencies': [
      0,
      {
        devDependencies: true,
        // peerDependencies: true,
      },
    ],
    'vue/multi-word-component-names': 'off',
  },
};
