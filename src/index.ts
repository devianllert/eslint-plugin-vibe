import { noObjectLiteralTypesForProps } from "./rules/no-object-literal-types.ts";

export const rules = {
  "no-object-literal-types": noObjectLiteralTypesForProps,
};

const plugin = { rules };

export const configs = {
  recommended: {
    name: "eslint-plugin-vibe/recommended",
    plugins: { "eslint-plugin-vibe": plugin },
    rules: { "eslint-plugin-vibe/no-object-literal-types": "error" },
  },
};

// Probably not needed, but keep for backwards compatibility
export default { rules, configs };
