import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import boundaries from 'eslint-plugin-boundaries';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import storybook from 'eslint-plugin-storybook';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const LAYERS = ['app', 'pages', 'widgets', 'features', 'entities', 'shared'];

const layerElements = LAYERS.map((layer) => ({
  type: layer,
  pattern: `src/${layer}/*`,
  capture: ['slice'],
}));

const layerDependencies = LAYERS.map((layer, index) => ({
  from: [layer],
  allow: LAYERS.slice(index + 1).map((lower) => [lower, { slice: '*' }]),
}));

export default tseslint.config(
  {
    ignores: [
      'dist',
      'coverage',
      'storybook-static',
      'node_modules',
      'package-lock.json',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...storybook.configs['flat/recommended'],
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.config.ts', '*.config.js'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
      globals: { ...globals.browser, ...globals.node },
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': { typescript: { alwaysTryTypes: true } },
      'boundaries/elements': layerElements,
      'boundaries/include': ['src/**/*'],
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
      'simple-import-sort': simpleImportSort,
      boundaries,
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...react.configs.flat['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.flatConfigs.recommended.rules,

      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      'no-console': ['error', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'always'],
      'no-restricted-syntax': [
        'error',
        {
          selector:
            "CallExpression[callee.property.name='bind'][arguments.0.type='ThisExpression']",
          message: 'Use an arrow function closure instead of .bind(this, ...).',
        },
      ],

      'import/no-unresolved': 'error',
      'import/no-cycle': 'error',
      'import/no-duplicates': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'],
            ['^node:', '^@?\\w'],
            [`^(${LAYERS.join('|')})(/.*|$)`],
            ['^\\.'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',

      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          message: 'FSD: ${file.type} must not import ${dependency.type}.',
          rules: [
            ...layerDependencies,
            { from: ['app'], allow: [['app', { slice: '*' }]] },
            { from: ['shared'], allow: [['shared', { slice: '*' }]] },
          ],
        },
      ],
      'boundaries/entry-point': [
        'error',
        {
          default: 'disallow',
          message: 'FSD: import slices through their public API (index.ts).',
          rules: [
            {
              target: ['pages', 'widgets', 'features', 'entities'],
              allow: 'index.ts',
            },
            { target: ['app'], allow: '**' },
            { target: ['shared'], allow: '**' },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.stories.tsx', '**/*.test.{ts,tsx}', 'src/test/**/*.{ts,tsx}'],
    rules: {
      'boundaries/element-types': 'off',
      'boundaries/entry-point': 'off',
      'no-console': 'off',
    },
  },
  {
    files: ['**/*.{js,cjs,mjs}', '.storybook/**/*.{ts,tsx}', 'vite.config.ts'],
    extends: [tseslint.configs.disableTypeChecked],
    rules: {
      'boundaries/element-types': 'off',
      'boundaries/entry-point': 'off',
    },
  },
  {
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: globals.node,
    },
  },
  prettier
);
