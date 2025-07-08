import { enforceExplicitProps } from "./enforce-explicit-types.ts";

export const rules = {
  "enforce-explicit-types": enforceExplicitProps,
};

const plugin = { rules };

export const configs = {
  recommended: {
    name: "eslint-custom-rules/recommended",
    plugins: { "eslint-custom-rules": plugin },
    rules: { "eslint-custom-rules/enforce-explicit-types": "error" },
  },
};

// Probably not needed, but keep for backwards compatibility
export default { rules, configs };
