import tseslint from "typescript-eslint";
import eslint from "@eslint/js";

export default tseslint.config(
  eslint.configs.recommended, // a set of recommended ESLint rules
  ...tseslint.configs.recommended, // a set of recommended TypeScript ESLint rules
  {
    // our own additional config
    languageOptions: {
      parser: tseslint.parser,
    },
    files: ["*.ts, *.tsx"],
    plugins: {
    },
    rules: {
    },
  }
);
