// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import eslintConfigPrettier from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'

export default withNuxt(
  // Your custom configs here
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-multiple-template-root': 'off',
      '@typescript-eslint/no-unused-vars': 'warn'
    }
  },
  {
    files: ['nuxt.config.ts'],
    rules: {
      'no-constant-binary-expression': 'off'
    }
  },
  {
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      ...eslintConfigPrettier.rules
    }
  }
)
