import { alert } from '../../../../../src/shared/modules/alert/alertReducers'
import { AlertState } from '../../../../../src/shared/modules/state'
import { createAlert } from '../../../../../src/shared/modules/alert/alertActions'
import { urlChanged } from '../../../../../src/shared/modules/actions'

describe('Alert reducer', () => {
  it('creates alert', () => {
    const payload: AlertState = {
      message: 'test alert',
      type: 'danger',
      focus: true,
      dismissible: false,
    }
    expect(alert(null, createAlert(payload))).toEqual(payload)
  })

  it('resets alerts on URL change', () => {
    const state: AlertState = {
      message: 'test alert',
      type: 'danger',
      focus: true,
      dismissible: false,
    }
    expect(alert(state, urlChanged())).toBe(null)
  })
})
