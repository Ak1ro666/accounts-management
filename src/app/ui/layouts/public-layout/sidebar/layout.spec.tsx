import { screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { renderWithTranslation } from '@/shared/lib/react/tests'

import { Layout } from './layout'

describe('Sidebar', () => {
  test('render Sidebar', () => {
    renderWithTranslation(<Layout switchers={null} />)
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
  })
})
