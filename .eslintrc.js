module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: "module",
    project: ["./tsconfig.json"],
    ecmaVersion: "latest",
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
  plugins: ["prettier", "react", "react-hooks", "jsx-a11y", "storybook"],
  extends: [
    "eslint:recommended",
    "react-app",
    "react-app/jest",
    "plugin:storybook/recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],
  overrides: [
    {
      files: ["**/*.stories.*", "**/*.mdx"],
      rules: {
        "import/no-anonymous-default-export": "off",
        "react/function-component-definition": "off",
        "react/jsx-props-no-spreading": "off",
        "import/no-extraneous-dependencies": "off",
        "@typescript-eslint/no-empty-function": "off",
        "no-console": "off",
        "react/jsx-filename-extension": "off",
        "react/destructuring-assignment": "off",
      },
    },
    {
      files: ["features/**/*.ts"],
      rules: {
        "func-names": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "testing-library/prefer-screen-queries": "off",
      },
    },
    {
      files: ["src/slices/*.ts"],
      rules: {
        "no-param-reassign": "off",
      },
    },
  ],
};
