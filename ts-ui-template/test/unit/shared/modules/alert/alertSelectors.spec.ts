import { hasError } from '../../../../../src/shared/modules/alert/alertSelectors'
import { createConfig } from '../../../../factories/testAppProvider'
import { State, AlertState, INITIAL_INSTAGRAM } from '../../../../../src/shared/modules/state'

describe('Alert selectors', () => {
  const createState = (alert: AlertState | null): State => ({
    meta: { config: createConfig(), isLoading: false, privacyAccepted: true, sellerDemo: false },
    alert,
    error: null,
    instagram: { ...INITIAL_INSTAGRAM },
  })

  it('Detects an error when alert is danger', () => {
    expect(
      hasError(
        createState({ message: 'message', type: 'danger', focus: false, dismissible: false }),
      ),
    ).toBe(true)
  })

  it('Does not detects an error when alert is not danger', () => {
    expect(
      hasError(
        createState({ message: 'message', type: 'success', focus: false, dismissible: false }),
      ),
    ).toBe(false)
  })

  it('Does not detect an error when alert is null', () => {
    expect(hasError(createState(null))).toBe(false)
  })
})
