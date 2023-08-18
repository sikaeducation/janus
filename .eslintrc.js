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
  plugins: [
    "react",
    "jest-dom",
    "@typescript-eslint",
    "react-hooks",
    "prettier",
    "jsx-a11y",
  ],
  extends: [
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:storybook/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:jest-dom/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    quotes: ["error", "double"],
    "no-shadow": "off",
    "no-use-before-define": "off",
    "no-underscore-dangle": "off",
    "import/extensions": "off",
    "no-restricted-exports": "off",
  },
  overrides: [
    {
      files: [
        "**/*.{test,spec}.{ts,tsx,js,jsx}",
        "**/features/**/*.{ts,tsx}",
        "**/setupTests.{js,ts}",
        "**/reportWebVitals.{js,ts}",
      ],
      rules: {
        "import/no-extraneous-dependencies": [
          "error",
          {
            devDependencies: [
              "**/*.{test,spec}.{ts,tsx,js,jsx}",
              "**/features/**/*.{ts,tsx}",
              "**/setupTests.{js,ts}",
              "**/reportWebVitals.{js,ts}",
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
        "testing-library/prefer-screen-queries": "off",
      },
    },
    {
      files: ["src/slices/*.ts"],
      rules: {
        "no-param-reassign": "off",
      },
    },
    {
      files: ["**/*.{tsx,jsx}"],
      rules: {
        "react/react-in-jsx-scope": "off",
        "react/require-default-props": "off",
        "react/jsx-filename-extension": [
          "error",
          {
            extensions: [".tsx", ".jsx"],
          },
        ],
        "jsx-a11y/label-has-associated-control": [
          "error",
          {
            assert: "htmlFor",
          },
        ],
      },
    },
  ],
};
