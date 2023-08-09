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
      files: ["**/*.{js,jsx,ts,tsx}"],
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
        "max-len": "off",
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
    },
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
