module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "plugin:storybook/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "react-hooks", "prettier"],
  rules: {
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".tsx"],
      },
    ],
    "react/react-in-jsx-scope": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
        tsx: "never",
      },
    ],
    "no-shadow": "off",
    "default-case": "off",
    "consistent-return": "off",
    "no-underscore-dangle": "off",
    "react/require-default-props": "off",
    "react/jsx-no-constructed-context-values": "off",
    "no-use-before-define": "off",
    "@typescript-eslint/no-shadow": ["off"],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "off",
    "jsx-a11y/label-has-associated-control": [
      "error",
      {
        assert: "htmlFor",
      },
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "**/*.test.ts",
          "**/*.spec.ts",
          "**/*.test.tsx",
          "**/*.spec.tsx",
        ],
      },
    ],
  },
  overrides: [
    {
      files: ["**/*.stories.*"],
      rules: {
        "import/no-anonymous-default-export": "off",
        "react/function-component-definition": "off",
        "react/jsx-props-no-spreading": "off",
        "import/no-extraneous-dependencies": "off",
        "@typescript-eslint/no-empty-function": "off",
        "no-console": "off",
      },
    },
  ],
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
};
