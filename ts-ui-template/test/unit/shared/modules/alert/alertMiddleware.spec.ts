import configureStore from 'redux-mock-store'
import { alertMiddleware } from '../../../../../src/shared/modules/alert/alertMiddleware'
import { wait } from 'react-testing-library'
import { createAlert } from '../../../../../src/shared/modules/alert/alertActions'
import { State } from '../../../../../src/shared/modules/state'

function testStore(state: DeepPartial<State>) {
  const mockStore = configureStore([alertMiddleware])
  return mockStore(state)
}

describe('Alert middleware', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn()
  })

  describe('alert', () => {
    it('handles an alert with focus', async () => {
      const store = testStore({ meta: { config: {} } })

      store.dispatch(
        createAlert({ message: 'Alert message', type: 'success', focus: true, dismissible: false })
      )

      await wait(() => {
        expect(window.scrollTo).toHaveBeenCalledWith({
          top: 0,
          behavior: 'smooth'
        })
      })
    })
  })
})
