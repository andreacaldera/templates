import 'jest-dom/extend-expect'
import React from 'react'
import { render, cleanup } from 'react-testing-library'
import { Main } from '../../../../src/client/containers/Main'
import { Provider } from 'react-redux'
import { createConfig } from '../../../factories/testAppProvider'
import { createMemoryHistory } from 'history'
import configureStore from '../../../../src/shared/store/configureStore'

describe('Main', () => {
  beforeEach(cleanup)

  it("displays children if there's no error in state", () => {
    const content = 'Test Content'
    const config = createConfig()
    const state = { meta: { config }, error: null }
    const store = configureStore(state, createMemoryHistory())

    const { getByText } = render(
      <Provider store={store}>
        <Main>{content}</Main>
      </Provider>,
    )
    expect(getByText(content)).toBeInTheDocument()
  })
})
