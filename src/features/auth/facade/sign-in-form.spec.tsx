import { screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { renderForTests } from '@/shared/lib/react/render-for-tests'

import { SignInForm } from './sign-in-form'

describe('SignInForm', () => {
  test('render SignInForm', () => {
    renderForTests(<SignInForm />)
    expect(screen.getByTestId('SignInForm')).toBeInTheDocument()
  })
})
