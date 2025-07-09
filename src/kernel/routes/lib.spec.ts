import { describe, expect, test } from 'vitest'

import { href } from './lib'

describe('href', () => {
  test('with one parametr', () => {
    expect(href('/users/:userId', { userId: '1' })).toBe('/users/1')
  })

  test('with many parameters', () => {
    expect(
      href('/organizations/:organizationId/users/:userId', {
        organizationId: '2',
        userId: '3'
      })
    ).toEqual('/organizations/2/users/3')
  })
})
