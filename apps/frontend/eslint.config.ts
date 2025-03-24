import pluginVue from 'eslint-plugin-vue';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import pluginVitest from '@vitest/eslint-plugin';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import eslintBase from '../../eslint.config';

export default defineConfigWithVueTs(
	{
		name: 'app/files-to-lint',
		files: ['**/*.{ts,mts,tsx,vue}'],
	},

	{
		name: 'app/files-to-ignore',
		ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
	},
	...eslintBase,
	pluginVue.configs['flat/essential'],
	vueTsConfigs.strict,
	vueTsConfigs.stylistic,

	{
		...pluginVitest.configs.recommended,
		files: ['src/**/__tests__/*'],
	},
	skipFormatting,
	{
		rules: {
			'vue/multi-word-component-names': 'off',
			'@typescript-eslint/no-unused-vars': 'warn',
			"@typescript-eslint/no-non-null-assertion": "warn",
			'vue/max-attributes-per-line': [
				'warn',
				{
					singleline: 1,
					multiline: 1,
				},
			],
			'vue/html-self-closing': [
				'warn',
				{
					html: {
						void: 'always',
						normal: 'never',
						component: 'always',
					},
					svg: 'always',
					math: 'always',
				},
			],
			'vue/html-closing-bracket-newline': [
				'warn',
				{
					singleline: 'never',
					multiline: 'always',
				},
			],
			'vue/html-indent': ['warn', 2],
			'vue/attributes-order': 'warn',
		}
	}
);
