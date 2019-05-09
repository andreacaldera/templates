import React from 'react'
import { State } from '../../src/shared/modules/state'
import { merge } from 'ramda'
import { Provider } from 'react-redux'
import configureStore from '../../src/shared/store/configureStore'
import { createMemoryHistory, History } from 'history'

export function createConfig() {
  return {
    baseUrl: 'https://ipanda-base-url',
    baseApiUrl: 'https://api.ipanda-base-url',
    imageBaseUrl: 'https://image-base-url',
    diagnosticsUrl: 'https://diagnostics-url/',
    logoutUrl: 'https://logout-url/',
    csrfToken: 'test-csrf-token',
    user: {
      name: 'Test Name',
    },
    mongodb: {
      hosts: '',
      database: '',
      ssl: false,
      itemsCollection: '',
    },
  }
}

export function createProvider(
  component: React.ReactElement<any>,
  stateOverride?: DeepPartial<State>,
  history: History = createMemoryHistory(),
) {
  const config = createConfig()
  const state = merge(
    { meta: { config }, person: { selectedPersonImage: { imageId: null, imageFile: null } } },
    stateOverride,
  )
  const store = configureStore(state, history)

  return <Provider store={store}>{component}</Provider>
}
