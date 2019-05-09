import { createApplicationError } from '../../../../../src/shared/modules/error/errorActions'

describe('Error', () => {
  it('has error creation actions', () => {
    const title = 'Test Title'
    const message = 'Test Message'
    expect(createApplicationError({ title, message })).toEqual({
      type: 'APPLICATION_ERROR',
      payload: { title, message }
    })
  })
})
