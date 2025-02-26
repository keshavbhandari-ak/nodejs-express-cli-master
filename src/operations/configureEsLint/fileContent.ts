export const eslintConfigMjsContent = `import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {ignores: ["dist/**", "node_modules/**", ".json"]},
  {languageOptions: { globals: globals.browser }},
  {rules: {
    "semi": ["error", "always"], // Require semicolons
    "quotes": ["error", "double"], // Enforce double quotes
    "no-unused-vars": "warn", // Warn about unused variables
    "eqeqeq": ["error", "always"], // Require === instead of ==
    "indent": ["error", 2] // Enforce 2-space indentation
  }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
`;
