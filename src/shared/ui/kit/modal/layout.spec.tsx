import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { Layout } from './layout'

describe('UiModal', () => {
  test('render UiModal', () => {
    render(<Layout open />)
    expect(screen.getByTestId('modal')).toBeInTheDocument()
  })

  test('render UiModal with title', () => {
    render(
      <Layout
        open
        title='Modal'
      />
    )
    expect(screen.getByTestId('title')).toBeInTheDocument()
    // screen.debug()
  })
})
