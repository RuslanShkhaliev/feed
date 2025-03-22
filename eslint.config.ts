import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginN from 'eslint-plugin-n';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginImport from 'eslint-plugin-import';

export default tseslint.config(
    {
        ignores: ['**/build/**', '**/dist/**'],
    },
    eslint.configs.recommended,
    tseslint.configs.recommended,
    {
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            import: eslintPluginImport,
            n: eslintPluginN,
            prettier: eslintPluginPrettier,
        },
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                projectService: true,
            },
        },
        rules: {
            'prettier/prettier': [
                'warn',
                {
                    semi: true,
                    singleQuote: true,
                    trailingComma: 'all',
                    printWidth: 100,
                    tabWidth: 4,
                    endOfLine: 'auto',
                },
            ],
            'no-console': 'warn',
            'no-unused-vars': 'warn',
            '@typescript-eslint/no-floating-promises': 'off',
            '@typescript-eslint/no-unused-vars': 'warn',
        },
    },
);
