module.exports = {
  extends: "../../.eslintrc.js",
  overrides: [
    {
      files: ["*.ts", "*.tsx"], // Your TypeScript files extension
      parserOptions: {
        project: [
          "./tsconfig.json",
          "./ormconfig.js",
        ], // Specify it only for TypeScript files
      },
    },
  ],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".ts"],
      },
      typescript: {
        alwaysTryTypes: true,
        project: ["tsconfig.json", "services/*/tsconfig.json"],
      },
    },
  },
};
