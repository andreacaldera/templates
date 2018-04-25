
import React from 'react';
import { browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { render, unmountComponentAtNode } from 'react-dom';
import { Provider } from 'react-redux';
import UrlPatter from 'url-pattern'; // TODO check impact of using this on client

import configureStore from '../common/store/configure-store';
import routes from '../common/routes';
import clientSagas from './client-sagas';

import { APP_CONTAINER_ID, APP_REDUX_STATE_ID, APP_PATTERN, APP_NAME } from '../common/constants';

// const basePath = `http://localhost:${APP_PORT}`; // TODO remove host:port dependency

const appCheckoutManager = {
  initialised: false,
  isActive: false,
  lazyLoad: false,
};

const appPattern = new UrlPatter(APP_PATTERN);
const domElement = document.getElementById(APP_CONTAINER_ID);

const debug = (event) =>
   console.log('MICRO UI CLIENT', APP_NAME, event); // eslint-disable-line no-console

const configureApp = (state) => {
  debug('configure');
  const store = configureStore(browserHistory, state, true, clientSagas);
  const history = window.__MICRO_UI__.history || syncHistoryWithStore(browserHistory, store);
  return {
    store,
    history,
  };
};

function renderApp() {
  render(
    <Provider store={appCheckoutManager.store}>
      <Router history={appCheckoutManager.history} routes={routes} />
    </Provider>,
    domElement
  );
}

function initialiseApp(state) {
  const { store, history } = configureApp(state);
  debug('initialise');
  appCheckoutManager.store = store;
  appCheckoutManager.history = history;

  appCheckoutManager.initialised = true;
}

function unmount() {
  debug('unmmount');
  appCheckoutManager.isActive = false;
  unmountComponentAtNode(domElement);
}

function isActive(location = window.location.pathname) {
  return Boolean(appPattern.match(location));
}

function mount(location = window.location.pathname) {
  if (!isActive(location)) {
    debug('not mounting: inactive');
    return;
  }
  if (appCheckoutManager.isActive) {
    debug('not mounting, already active');
    return;
  }
  debug('mount');
  appCheckoutManager.isActive = true;
  return Promise.resolve()
    .then(() => {
      if (appCheckoutManager.initialised) {
        debug('already initialised');
        return renderApp();
      }
      // superagent(`${basePath}${location}`)
      //   .set('Accept', 'application/json')
      //   .then(({ body }) => {
      //     initialiseApp(body);
      //     return renderApp();
      //   });
    });
}

window.__MICRO_UI__.apps = Object.assign(
  {},
  window.__MICRO_UI__.apps,
  {
    [APP_NAME]: {
      mount,
      unmount,
      isActive,
    },
  }
);

if (!appCheckoutManager.lazyLoad || window[APP_REDUX_STATE_ID]) {
  initialiseApp(window[APP_REDUX_STATE_ID] || {});
}

mount();
