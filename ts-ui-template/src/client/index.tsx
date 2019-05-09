import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import configureStore from '../shared/store/configureStore'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { renderRoutes } from 'react-router-config'
import { routes } from '../shared/routes'

const history = createBrowserHistory()
const store = configureStore(window.__initialState__, history)

ReactDOM.hydrate(
  <Provider store={store}>
    <Router history={history}>{renderRoutes(routes as any)}</Router>
  </Provider>,
  document.getElementById('app'),
)

if (module.hot) {
  module.hot.accept()
}
