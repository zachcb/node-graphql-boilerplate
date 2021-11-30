module.exports = {
  extends: "../../.eslintrc.js",
  plugins: ["import"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"], // Your TypeScript files extension
      rules: {
        "@typescript-eslint/explicit-module-boundary-types": 0,
      },
      parserOptions: {
        project: [
          "./tsconfig.json",
        ], // Specify it only for TypeScript files
      },
    },
  ],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: ["tsconfig.json", "packages/*/tsconfig.json"],
      },
    },
  },
};
