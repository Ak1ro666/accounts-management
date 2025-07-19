import type { Meta, StoryObj } from '@storybook/react-vite'

import { Layout } from './layout'

const meta = {
  title: 'shared/UiLoader',
  component: Layout,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Layout>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {}
}
