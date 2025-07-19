import { ReactRenderer } from '@storybook/react-vite'
import { BrowserRouter } from 'react-router-dom'
import { PartialStoryFn } from 'storybook/internal/csf'

export const RouterDecorator = (
  StoryComponent: PartialStoryFn<ReactRenderer>
) => {
  return (
    <BrowserRouter>
      <StoryComponent />
    </BrowserRouter>
  )
}
