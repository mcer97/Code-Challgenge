import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import generatePackageJson from "rollup-plugin-generate-package-json";

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      postcss({
        extract: false,
        modules: true,
        use: ["sass"],
      }),
      typescript({
        tsconfig: "./tsconfig.json",
        exclude: [
          "**/__tests__",
          "**/*.test.tsx",
          "**/*.stories.tsx",
          "**/stories/*",
        ],
      }),
      terser(),
      generatePackageJson({
        outputFolder: "dist",
        baseContents: (pkg) => ({
          name: pkg.name,
          main: packageJson.module,
          version: packageJson.version,
        }),
      }),
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];
