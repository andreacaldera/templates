import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from '../common/store/configure-store';
import routes from '../common/routes';

const store = configureStore(browserHistory, window.__PARENT_APP_INITIAL_STATE__, true);
const history = syncHistoryWithStore(browserHistory, store);

history.listen((location) => {
  if (!window.__MICRO_UI__) {
    return;
  }
  Object.keys(window.__MICRO_UI__).forEach((appName) => {
    const app = window.__MICRO_UI__[appName];
    if (app.isActive(location.pathname)) {
      app.mount(location.pathname);
    } else {
      app.unmount();
    }
  });
});

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
