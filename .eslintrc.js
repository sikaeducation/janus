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
    "plugin:jsx-a11y/recommended",
    "plugin:jest-dom/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: [
    "react",
    "jest-dom",
    "@typescript-eslint",
    "react-hooks",
    "prettier",
    "jsx-a11y",
  ],
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
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
};
