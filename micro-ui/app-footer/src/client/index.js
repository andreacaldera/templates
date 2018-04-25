
import React from 'react';

import { render, unmountComponentAtNode } from 'react-dom';
import UrlPatter from 'url-pattern'; // TODO check impact of using this on client

import Footer from '../common/components/Footer';

import { APP_CONTAINER_ID, APP_PATTERN, APP_NAME } from '../common/constants';

// const basePath = `http://localhost:${APP_PORT}`; // TODO remove host:port dependency

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
  render(<Footer />, domElement);
}

function initialiseApp() {
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

function mount() {
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
    .then(() => renderApp());
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

initialiseApp();


mount();
