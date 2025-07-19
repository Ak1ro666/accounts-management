import type { Meta, StoryObj } from '@storybook/react-vite'

import { Box, Button } from '@mui/material'

import { Layout } from './layout'

const meta = {
  title: 'app/Sidebar',
  component: Layout,
  parameters: {},
  tags: ['autodocs']
} satisfies Meta<typeof Layout>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    switchers: (
      <Box>
        <Button>Язык</Button>
        <Button>Свернуть</Button>
      </Box>
    )
  }
}
