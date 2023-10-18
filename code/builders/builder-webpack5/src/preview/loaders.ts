import { getProjectRoot } from '@storybook/core-common';
import type { Options } from '@swc/core';
import type { RuleSetRule } from 'webpack';

export const createSWCLoader = (excludes: string[] = [], swc: Options): RuleSetRule => {
  return {
    test: /\.(mjs|cjs|tsx?|jsx?)$/,
    use: [
      {
        loader: require.resolve('swc-loader'),
        options: {
          ...swc,
          jsc: {
            ...(swc.jsc ?? {}),
            parser: {
              ...(swc.jsc?.parser ?? {}),
              syntax: 'typescript',
              tsx: true,
              dynamicImport: true,
            },
          },
        },
      },
    ],
    include: [getProjectRoot()],

    exclude: [/node_modules/],
  };
};
