import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { SignInForm } from './sign-in-form'

describe('SignInForm', () => {
  test('render SignInForm', () => {
    render(<SignInForm />)
    expect(screen.getByTestId('SignInForm')).toBeInTheDocument()
  })
})
