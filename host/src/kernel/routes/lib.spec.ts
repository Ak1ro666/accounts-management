import { describe, expect, test } from 'vitest'

import {
  testStringWithManyParams,
  testStringWithOneParams
} from './__test__/stub'
import { href } from './lib'

describe('href', () => {
  test('with one parametr', () => {
    expect(href(testStringWithOneParams, { userId: '1' })).toBe('/users/1')
  })

  test('with many parameters', () => {
    expect(
      href(testStringWithManyParams, {
        organizationId: '2',
        userId: '3'
      })
    ).toEqual('/organizations/2/users/3')
  })
})
