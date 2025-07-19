import type { StorybookConfig } from '@storybook/react-vite'

import { mergeConfig } from 'vite'
import viteTsconfigPaths from 'vite-tsconfig-paths'

const config: StorybookConfig = {
  stories: [
    '../../src/**/*.mdx',
    '../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      plugins: [viteTsconfigPaths()]
    })
  }
}
export default config
