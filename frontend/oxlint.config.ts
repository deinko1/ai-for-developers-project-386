import eslintRecommended from '@jay-es/oxlint-eslint-configs/eslint/recommended'
import jsxA11yRecommended from '@jay-es/oxlint-eslint-configs/jsx-a11y/recommended'
import reactHooksRecommended from '@jay-es/oxlint-eslint-configs/react/hooks-recommended'
import reactJsxRuntime from '@jay-es/oxlint-eslint-configs/react/jsx-runtime'
import reactRecommended from '@jay-es/oxlint-eslint-configs/react/recommended'
import typescriptRecommended from '@jay-es/oxlint-eslint-configs/typescript/recommended'
import vitestRecommended from '@jay-es/oxlint-eslint-configs/vitest/recommended'
import { defineConfig } from 'oxlint'

// The React + TypeScript + Vitest essentials, ported from the popular ESLint
// presets (eslint, typescript-eslint, eslint-plugin-react, jsx-a11y, vitest)
// to oxlint rule names. Later spreads win: jsx-runtime turns off the JSX-scope
// rules that only the classic runtime needed.
export default defineConfig({
  plugins: ['typescript', 'oxc', 'react', 'jsx-a11y', 'unicorn', 'vitest'],
  ignorePatterns: ['dist/**', 'src/components/ui/**'],
  rules: {
    ...eslintRecommended,
    ...typescriptRecommended,
    ...reactRecommended,
    ...reactJsxRuntime,
    ...reactHooksRecommended,
    ...jsxA11yRecommended,
    ...vitestRecommended,
  },
})
