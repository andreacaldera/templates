import { concatenate } from '../../../src/shared/string'

describe('concatenate()', () => {
  it('joins fragments', () => {
    expect(concatenate('a', 'b', 'c')).toBe('a b c')
  })

  it('joins fragments, omitting falsy elements', () => {
    expect(concatenate('a', 'b', '', null, false, undefined, 'c')).toBe('a b c')
  })
})
