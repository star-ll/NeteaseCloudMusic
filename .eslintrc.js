module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    // "eslint:recommended",
    "plugin:react/recommended",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react"],
  rules: {
    // indent: ["error", "tab"],
    // "linebreak-style": [
    // 	"error",
    // 	"windows"
    // ],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "max-len": ["error", { code: 120 }],
    "react/prop-types": "off", // 对prop进行验证
  },
};
