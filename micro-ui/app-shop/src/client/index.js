import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { renderRoutes } from 'react-router-config';

import configureStore from '../common/store/configure-store';
import routes from '../common/routes';
import clientSagas from './client-sagas';

const subscribers = [];

window.__MICRO_UI__ = window.__MICRO_UI__ || {
  apps: {},
  publish: function publish(action) {
    subscribers.map((subscribe) => subscribe(action));
  },
  subscribe: function subscribe(subscriber) {
    subscribers.push(subscriber);
  },
};

const store = configureStore(window.__PARENT_APP_INITIAL_STATE__, true, clientSagas);

const AppRouter = () => (
  <Provider store={store}>
    <BrowserRouter>
      {renderRoutes(routes)}
    </BrowserRouter>
  </Provider>
);

render(<AppRouter />, document.getElementById('app'));
