import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

const ignoredPaths = [
  '.yarn/**/*',
  '**/node_modules/**/*',
  '.pnp.*',
  'www/**/*',
  '**/dist/**/*',
  '**/build/**/*',
  'loader/**/*',
  'public/**/*',
  'website/**/*',
  'playwright-report/**/*',
  '.vscode/**/*',
  '.idea/**/*',
]

/** @type {import('eslint').Linter.Config[]} */
export default [
  { name: 'Ignored files', ignores: ignoredPaths },
  {files: ["**/*.{ts}"]},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];