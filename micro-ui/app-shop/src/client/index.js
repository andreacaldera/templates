import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from '../common/store/configure-store';
import routes from '../common/routes';

const store = configureStore(browserHistory, window.__PARENT_APP_INITIAL_STATE__, true);
const history = syncHistoryWithStore(browserHistory, store);

window.__MICRO_UI__ = window.__MICRO_UI__ || { apps: [], history };

history.listen((location) => {
  if (!window.__MICRO_UI__) {
    return;
  }
  console.log('app-shop location changed', location);
  Object.keys(window.__MICRO_UI__.apps).forEach((appName) => {
    const app = window.__MICRO_UI__.apps[appName];
    if (app.isActive(location.pathname)) {
      app.mount(location.pathname);
    } else {
      app.unmount();
    }
  });
});

window.__MICRO_UI__.history = history;

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app')
);

const subscribers = [];

window.__MICRO_UI__.subscribe = function subscribe(subscriber) {
  subscribers.push(subscriber);
};

window.__MICRO_UI__.publish = function publish(action) {
  subscribers.map((subscribe) => subscribe(action));
};
