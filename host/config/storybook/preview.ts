import type { Preview } from '@storybook/react-vite'

import { RouterDecorator } from '../../src/shared/model/storybook/decorators/router-decorator'

const preview: Preview = {
  decorators: [RouterDecorator],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export default preview
