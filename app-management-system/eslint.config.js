import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import globals from "globals";

export default [
  { files: ["src/**/*.jsx", "src/**/*.js"] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  { ...pluginReactConfig, settings: { react: { version: "detect" } } },
];
