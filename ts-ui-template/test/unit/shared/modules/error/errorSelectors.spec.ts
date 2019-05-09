import { createConfig } from '../../../../factories/testAppProvider'
import { State, ApplicationError, INITIAL_INSTAGRAM } from '../../../../../src/shared/modules/state'
import { getError } from '../../../../../src/shared/modules/error/errorSelectors'

describe('Error selectors', () => {
  const createState = (error: ApplicationError | null): State => ({
    meta: { config: createConfig(), isLoading: false, privacyAccepted: false, sellerDemo: false },
    error,
    alert: null,
    instagram: { ...INITIAL_INSTAGRAM },
  })

  it('selects the error state branch', () => {
    const error = { title: 'Test title', message: 'Test message' }
    expect(getError(createState(error))).toEqual(error)
  })
})
