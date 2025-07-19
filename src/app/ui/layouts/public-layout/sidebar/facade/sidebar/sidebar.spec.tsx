import { screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { renderForTests } from '@/shared/lib/react/render-for-tests'

import { Sidebar } from './sidebar'

describe('Sidebar', () => {
  test('render Sidebar', () => {
    renderForTests(<Sidebar />)
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
  })
})
