import type { Meta, StoryObj } from '@storybook/react-vite'

import { Layout } from './layout'

const meta = {
  title: 'shared/UiWysiwigEditor',
  component: Layout,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Layout>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  parameters: {
    docs: {
      desciption: {
        story: 'Визивик редактор'
      }
    }
  },
  args: {
    initialContent:
      '<div>Some text</div><div><strong>Some bold text</strong></div>',
    onChange: () => {}
  }
}
