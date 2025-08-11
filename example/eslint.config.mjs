import tseslint from "typescript-eslint";
import eslint from "@eslint/js";
import config from "eslint-plugin-vibeast";

export default tseslint.config(
  eslint.configs.recommended, // a set of recommended ESLint rules
  tseslint.configs.recommended, // a set of recommended TypeScript ESLint rules
  config.configs.recommended,
  {
    rules: {
      "eslint-plugin-vibeast/no-object-literal-types": ["error"],
    },
  },
);
