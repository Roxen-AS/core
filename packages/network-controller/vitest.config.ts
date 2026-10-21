import { basename } from 'node:path';
import { defineConfig, mergeConfig } from 'vitest/config';

import baseConfig from '../../vitest.config.packages.js';

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      // oxlint-disable-next-line n/no-unsupported-features/node-builtins
      name: basename(import.meta.dirname),

      typecheck: {
        // The package's `tsconfig.json` uses project references, which `tsc
        // --noEmit` cannot resolve without a prior build, so every import
        // outside the type tests reports an error here. `lint:tsc` covers those
        // files; this run only has to cover the type tests.
        ignoreSourceErrors: true,
      },

      coverage: {
        // Type tests never execute, so they have no coverage to collect.
        exclude: ['src/**/*.test-d.ts'],

        thresholds: {
          branches: 93.17,
          functions: 97.94,
          lines: 97.47,
          statements: 97.36,
        },
      },
    },
  }),
);
