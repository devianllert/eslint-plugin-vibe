import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { rmSync, writeFileSync, readFileSync, copyFileSync } from "node:fs";
import { build } from "esbuild";

const configPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "./package.json",
);

const packageJSON = JSON.parse(readFileSync(configPath, "utf8"));

rmSync("dist", { force: true, recursive: true });

await build({
  bundle: true,
  entryPoints: ["src/index.ts"],
  outdir: "dist",
  platform: "node",
  target: "node14",
  external: Object.keys(packageJSON.peerDependencies),
});

copyFileSync("LICENSE", "dist/LICENSE");
copyFileSync("README.md", "dist/README.md");
copyFileSync("src/types.d.ts", "dist/index.d.ts");

writeFileSync(
  "dist/package.json",
  JSON.stringify(
    {
      name: packageJSON.name,
      description:
        "Project-specific linting rules for ESLint",
      version: packageJSON.version,
      type: "commonjs",
      author: "devianllert (https://github.com/devianllert)",
      license: packageJSON.license,
      repository: "github:devianllert/eslint-plugin-vibeast",
      main: "index.js",
      types: "index.d.ts",
      keywords: [
        "eslint",
        "eslint-plugin",
        "react",
      ],
      peerDependencies: packageJSON.peerDependencies,
    },
    null,
    2,
  ),
);
