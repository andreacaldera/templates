import { error } from '../../../../../src/shared/modules/error/errorReducers'
import { createApplicationError } from '../../../../../src/shared/modules/error/errorActions'
import { urlChanged } from '../../../../../src/shared/modules/actions'
import { ApplicationError } from '../../../../../src/shared/modules/state'

describe('Error reducer', () => {
  it('creates error', () => {
    const payload: ApplicationError = { title: 'Error Title', message: 'Error message.' }
    expect(error(null, createApplicationError(payload))).toEqual(payload)
  })

  it('resets alerts on URL change', () => {
    const state: ApplicationError = { title: 'Error Title', message: 'Error message.' }
    expect(error(state, urlChanged())).toBe(null)
  })
})
