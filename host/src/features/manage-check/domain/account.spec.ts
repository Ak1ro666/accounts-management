import { describe, expect, test } from 'vitest'

import { testChargesAsc, testChargesDesc } from '../__test__/stub'
import { getSortByDateAsc } from './account'

describe('manage-check/domain/account', () => {
  test('getSortByDateAsc', () => {
    const res = getSortByDateAsc(testChargesDesc)

    expect(res).toEqual(testChargesAsc)
  })
})
