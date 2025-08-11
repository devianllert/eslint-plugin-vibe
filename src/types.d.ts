/* eslint-disable @typescript-eslint/no-explicit-any */
type Config = {
  plugins: { "eslint-plugin-vibeast": { rules: Record<string, any> } };
  rules: Record<string, any>;
};

declare const _default: {
  rules: Record<string, any>;
  configs: {
    recommended: Config;
    vite: Config;
  };
};

export = _default;
