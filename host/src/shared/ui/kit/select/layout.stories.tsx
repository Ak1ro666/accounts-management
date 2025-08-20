import type { Meta, StoryObj } from '@storybook/react-vite'

import { Layout } from './layout'

const meta = {
  title: 'shared/UiSelect',
  component: Layout,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Layout>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    options: ['name', 'email', 'style', 'main'],
    getLabel: (name) => String(name)
  }
}
