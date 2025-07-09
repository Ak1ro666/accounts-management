import { screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { renderWithTranslation } from '@/shared/lib/react/decorate'

import { Layout } from './layout'

describe('Sidebar', () => {
  test('render Sidebar', () => {
    renderWithTranslation(<Layout switchers={<></>} />)
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
  })
})
