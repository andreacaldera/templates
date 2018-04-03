import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import superagent from 'superagent';

import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import UrlPatter from 'url-pattern'; // TODO check impact of using this on client

import configureStore from '../common/store/configure-store';
import routes from '../common/routes';

import { APP_CONTAINER_ID, APP_REDUX_STATE_ID, APP_PATTERN } from '../common/constants';

const appPattern = new UrlPatter(APP_PATTERN);

const domElement = document.getElementById(APP_CONTAINER_ID);

function isActive(location = window.location.pathname) {
  return Boolean(appPattern.match(location));
}

let initialised = false;
let store;
let history;
if (window[APP_REDUX_STATE_ID]) {
  store = configureStore(browserHistory, window[APP_REDUX_STATE_ID], true);
  history = syncHistoryWithStore(browserHistory, store);
  initialised = true;
}

function renderApp() {
  render(
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>,
    domElement
  );
}

function mount(location = window.location.pathname) {
  if (!isActive()) {
    return;
  }
  return Promise.resolve()
    .then(() => {
      if (initialised) {
        return renderApp();
      }
      superagent(`http://localhost:4001${location}`) // TODO remove host:port dependency
        .set('Accept', 'application/json')
        .then(({ body }) => {
          store = configureStore(browserHistory, body, true);
          history = syncHistoryWithStore(browserHistory, store);
          initialised = true;
          return renderApp();
        });
    });
}

function unmount() {
  console.log('UNMOUNTING', APP_CONTAINER_ID);
  unmountComponentAtNode(domElement);
}

window.__MICRO_UI__ = {
  ...window.__MICRO_UI__,
  appProduct: {
    mount,
    unmount,
    isActive,
  },
};

mount();
