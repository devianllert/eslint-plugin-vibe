import tseslint from "typescript-eslint";
import eslint from "@eslint/js";
import config from "eslint-custom-rules";

export default tseslint.config(
  eslint.configs.recommended, // a set of recommended ESLint rules
  tseslint.configs.recommended, // a set of recommended TypeScript ESLint rules
  config.configs.recommended,
  {
    rules: {
      "eslint-custom-rules/enforce-explicit-types": [
        "error",
        {
          checkVariables: true,
          checkGenerics: true,
          checkFunctions: true,
        }
      ],
    },
  }
);
