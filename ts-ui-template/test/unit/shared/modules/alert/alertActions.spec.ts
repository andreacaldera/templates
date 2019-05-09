import { createAlert } from '../../../../../src/shared/modules/alert/alertActions'

describe('Alert', () => {
  it('has alert creation actions', () => {
    const message = 'test'
    const type = 'danger'
    const focus = true
    const dismissible = true
    expect(createAlert({ message, focus, type, dismissible })).toEqual({
      type: 'CREATE_ALERT',
      payload: { message, type, focus, dismissible }
    })
  })
})
