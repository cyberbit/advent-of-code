module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  plugins: [
    'html', 'vue'
  ],
  extends: [
    "plugin:vue/recommended",
    "standard"
  ],
  'rules': {
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'indent': ['error', 2],
    'no-console': 0
  }
}