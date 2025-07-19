import type { Meta, StoryObj } from '@storybook/react-vite'

import { Box, Button } from '@mui/material'

import { Layout } from './layout'

const meta = {
  title: 'shared/UiModal',
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
    open: true,
    title: 'Modal',
    header: <header>Header</header>,
    body: <main>Body</main>,
    footer: <footer>Footer</footer>,
    actions: (
      <Box>
        <Button>Закрыть</Button>
        <Button>Подтвердить</Button>
      </Box>
    )
  }
}

export const FullWidth: Story = {
  args: {
    open: true,
    fullWidth: true,
    title: 'Modal',
    header: <header>Header</header>,
    body: <main>Body</main>,
    footer: <footer>Footer</footer>,
    actions: (
      <Box>
        <Button>Закрыть</Button>
        <Button>Подтвердить</Button>
      </Box>
    )
  }
}
