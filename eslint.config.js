import eslintJsPlugin from '@eslint/js';
import eslintJsxPlugin from '@stylistic/eslint-plugin';
import eslintPromisePlugin from 'eslint-plugin-promise';
import eslintTsPlugin from 'typescript-eslint';

/**
 * @see https://eslint.org/docs/latest/use/configure
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  { ignores: ['node_modules/**', '*.config.js', 'build.js'] },
  eslintJsPlugin.configs.recommended,
  ...eslintTsPlugin.configs.recommendedTypeChecked,
  {
    languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname } },
    plugins: { promise: eslintPromisePlugin, '@stylistic': eslintJsxPlugin },
    rules: {
      'no-empty': ['warn', { allowEmptyCatch: true }],
      '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      'array-callback-return': 'error',
      'arrow-body-style': 'error',
      'consistent-return': 'error',
      curly: 'error',
      'dot-notation': 'error',
      eqeqeq: 'error',
      'func-style': ['error', 'expression'],
      'no-duplicate-imports': 'error',
      'no-lone-blocks': 'error',
      'no-multi-assign': 'error',
      'no-param-reassign': 'error',
      'no-return-assign': 'error',
      'no-return-await': 'error',
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-shadow': 'error',
      'no-unneeded-ternary': 'error',
      'no-unused-expressions': 'error',
      'no-useless-return': 'error',
      'no-void': 'error',
      'object-shorthand': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-object-spread': 'error',
      'prefer-regex-literals': 'error',
      'prefer-spread': 'error',
      quotes: ['error', 'single', { avoidEscape: true }],
      yoda: 'error',
      'promise/prefer-await-to-then': 'error',
      '@typescript-eslint/array-type': ['error', { default: 'array' }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/no-unnecessary-qualifier': 'error',
      '@typescript-eslint/no-unnecessary-type-arguments': 'error',
      '@typescript-eslint/no-unnecessary-type-constraint': 'error',
      '@typescript-eslint/non-nullable-type-assertion-style': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/prefer-reduce-type-parameter': 'error',
      '@typescript-eslint/prefer-string-starts-ends-with': 'error',
      '@typescript-eslint/require-array-sort-compare': ['error', { ignoreStringArrays: true }],
      '@stylistic/jsx-curly-brace-presence': ['error', 'never'],
      '@stylistic/jsx-self-closing-comp': ['error', { component: true, html: true }],
      'no-restricted-syntax': [
        'error',
        'TSEnumDeclaration',
        'ForStatement',
        'ForOfStatement',
        'ForInStatement',
        'SwitchStatement'
      ]
    }
  }
];
