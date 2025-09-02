import { FlatCompat } from '@eslint/eslintrc';
import nextPlugin from '@next/eslint-plugin-next';
import perfectionist from 'eslint-plugin-perfectionist';
// eslint.config.js
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tseslint from 'typescript-eslint';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  {
    ignores: ['node_modules', '.next', 'dist'], // какие папки игнорить
  },

  // next + typescript
  ...tseslint.configs.recommended,
  // Use compatibility layer for Next shareable config (eslintrc-style)
  ...compat.extends('next/core-web-vitals'),

  // твои правила
  {
    plugins: {
      '@next/next': nextPlugin,
      perfectionist,
    },
    rules: {
      semi: 'error',
      quotes: ['error', 'single'],
      'prefer-arrow-callback': ['error'],
      'prefer-template': ['error'],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      'no-console': ['warn'],
      'perfectionist/sort-imports': ['error', { tsconfigRootDir: '.' }],
      'perfectionist/sort-named-imports': ['error'],
    },
  },
];

export default eslintConfig;
