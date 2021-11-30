module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "airbnb-base",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
  ],
  plugins: [
    "@typescript-eslint",
    "import",
  ],
  env: {
    node: true,
    es6: true,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "import/prefer-default-export": 0,
    "import/extensions": 0,
    "arrow-body-style": 0,
    "max-classes-per-file": 0,
    quotes: ["warn", "double"],

    // note you must disable the base rule as it can report incorrect errors
    "no-shadow": "off",
    "class-methods-use-this": 0,
    "@typescript-eslint/no-shadow": ["error"],
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "import/no-import-module-exports": 0,
    "import/no-cycle": 0,
  },
};
