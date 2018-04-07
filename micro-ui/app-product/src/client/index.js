
import React from 'react';
import BrowserRouter from 'react-router-dom/BrowserRouter';

import { render, unmountComponentAtNode } from 'react-dom';
import { Provider } from 'react-redux';
import UrlPatter from 'url-pattern'; // TODO check impact of using this on client
import superagent from 'superagent';
import { renderRoutes } from 'react-router-config';

import configureStore from '../common/store/configure-store';
import routes from '../common/routes';
import clientSagas from './client-sagas';

import { APP_CONTAINER_ID, APP_REDUX_STATE_ID, APP_PATTERN, APP_NAME, APP_PORT } from '../common/constants';

const basePath = `http://localhost:${APP_PORT}`; // TODO remove host:port dependency

window.__MICRO_UI__ = window.__MICRO_UI__ || {
  publish: () => {},
};

const appManager = {
  initialised: false,
  isActive: false,
};

const appPattern = new UrlPatter(APP_PATTERN);
const domElement = document.getElementById(APP_CONTAINER_ID);

const debug = (event) =>
   console.log('MICRO UI CLIENT', APP_NAME, event); // eslint-disable-line no-console

function renderApp() {
  const AppRouter = () => (
    <Provider store={appManager.store}>
      <BrowserRouter>
        {renderRoutes(routes)}
      </BrowserRouter>
    </Provider>
  );
  render(<AppRouter />, domElement);
}

function initialiseApp(state) {
  const store = configureStore(state, true, clientSagas);
  debug('initialise');
  appManager.store = store;

  appManager.initialised = true;
}

function unmount() {
  debug('unmmount');
  appManager.isActive = false;
  unmountComponentAtNode(domElement);
}

function isActive(location = window.location.pathname) {
  return Boolean(appPattern.match(location));
}

function mount(location = window.location.pathname) {
  if (!isActive()) {
    debug('not mounting: inactive');
    return;
  }
  if (appManager.isActive) {
    return;
  }
  debug('mount');
  appManager.isActive = true;
  return Promise.resolve()
    .then(() => {
      if (appManager.initialised) {
        debug('already initialised');
        return renderApp();
      }
      superagent(`${basePath}${location}`)
        .set('Accept', 'application/json')
        .then(({ body }) => {
          initialiseApp(body);
          return renderApp();
        });
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

if (window[APP_REDUX_STATE_ID]) {
  console.log('first initialise');
  initialiseApp(window[APP_REDUX_STATE_ID]);
}

mount();
