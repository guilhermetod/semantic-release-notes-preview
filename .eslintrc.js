const { gitIgnorePatterns } = require('./tools/utils/git-ignore-patterns');

const buildMemberDelimiter = (delimiter) => ({
  multiline: { delimiter, requireLast: true },
  singleline: { delimiter, requireLast: false },
});

const commonJSAndTSRules = {
  'array-bracket-newline': ['error', 'consistent'],
  'array-element-newline': ['error', 'consistent'],
  'function-paren-newline': ['error', 'multiline-arguments'],
  'import/no-extraneous-dependencies': ['error', { devDependencies: [
    './{test,tools}/**/*',
    './**/*.{d,test}.ts',
    './*.{js,ts}',
  ] }],
  'import/order': ['error', {
    alphabetize: { order: 'asc' },
    'newlines-between': 'always',
  }],
  'import/prefer-default-export': 'off',
  'object-curly-newline': ['error', { consistent: true }],
  'object-curly-spacing': ['error', 'always'],
};

module.exports = {
  ignorePatterns: [
    ...gitIgnorePatterns,
    'dist',
  ],
  overrides: [
    // Javascript
    {
      files: [
        '*.js',
      ],
      extends: [
        'airbnb-base',
      ],
      rules: {
        ...commonJSAndTSRules,
      },
    },
    // TypeScript
    {
      files: [
        '*.ts',
      ],
      extends: [
        'plugin:import/typescript',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb-base',
        'airbnb-typescript/base',
      ],
      plugins: ['import'],
      settings: {
        'import/resolver': {
          typescript: {
            project: './tsconfig.json',
          },
        },
      },
      parserOptions: {
        ecmaVersion: 2020,
        project: 'tsconfig.json',
      },
      rules: {
        ...commonJSAndTSRules,
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/member-delimiter-style': ['error', {
          ...buildMemberDelimiter('comma'),
          overrides: {
            interface: buildMemberDelimiter('semi'),
          },
        }],
        'max-len': ['error', 120, 2, {
          ignoreUrls: true,
          ignoreComments: false,
          ignoreRegExpLiterals: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        }],
        'no-restricted-imports': ['error', { patterns: ['../*', './*'] }],
      },
    },
  ],
};
