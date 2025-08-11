import { noObjectLiteralTypesForProps } from "./rules/no-object-literal-types.ts";

export const rules = {
  "no-object-literal-types": noObjectLiteralTypesForProps,
};

const plugin = { rules };

export const configs = {
  recommended: {
    name: "eslint-plugin-vibeast/recommended",
    plugins: { "eslint-plugin-vibeast": plugin },
    rules: { "eslint-plugin-vibeast/no-object-literal-types": "error" },
  },
};

// Probably not needed, but keep for backwards compatibility
export default { rules, configs };
