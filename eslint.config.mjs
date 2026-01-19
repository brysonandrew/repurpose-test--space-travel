import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import vitest from 'eslint-plugin-vitest';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),

  // ✅ Only apply Vitest globals/rules to test files
  {
    files: ['**/*.{test,spec}.{ts,tsx}', '**/test/**/*.{ts,tsx}'],
    plugins: { vitest },
    rules: {
      ...vitest.configs.recommended.rules,
    },
  },

  // ✅ Optional: also apply to Playwright tests if you want vitest disabled there
  {
    files: ['playwright/**/*.{ts,tsx}'],
    rules: {
      // prevent vitest rules from accidentally applying if you broaden patterns later
    },
  },
]);

export default eslintConfig;
