import Express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import cors from 'cors';

import configureStore from '../common/store/configure-store';
import routes from '../common/routes';
import { NAMESPACE } from '../common/modules/constants';
import api from './api';
import { APP_CONTAINER_ID, APP_REDUX_STATE_ID } from '../common/constants';

const app = Express();
const port = 5001;

app.use(cors());

app.use(cookieParser());

function renderFullPage(content, store) {
  return `
    <!doctype html>
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="http://localhost:${port}/dist/app-checkout.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
      <title>Checkout</title>
      </head>
      <body>
        <div id="${APP_CONTAINER_ID}">${content}</div>
        <script>window.${APP_REDUX_STATE_ID} = ${JSON.stringify(store.getState()).replace(/</g, '\\x3c')}</script>
        <script src="http://localhost:${port}/dist/app-checkout.js"></script>
      </body>
    </html>
    `;
}

function renderEmbeddedApp(content, store) {
  return `
    <div id="${APP_CONTAINER_ID}">${content}</div>
    <script>window.${APP_REDUX_STATE_ID} = ${JSON.stringify(store.getState()).replace(/</g, '\\x3c')}</script>
  `;
}

app.use('/dist', Express.static(path.join(__dirname, '../../dist')));

app.use('/api', api());

app.use('/favicon.ico', (req, res) => res.sendStatus(200));

app.use((req, res) => {
  const preloadedState = { [NAMESPACE]: { } };

  if (req.headers.accept === 'application/json') {
    return res.json(preloadedState);
  }

  const memoryHistory = createMemoryHistory(req.url);
  const store = configureStore(memoryHistory, preloadedState);
  const history = syncHistoryWithStore(memoryHistory, store);

  match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const content = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );
      const html = req.url.endsWith('?embedded') ? // TODO use url-pattern
        renderEmbeddedApp(content, store) :
        renderFullPage(content, store);
      res.send(html);
    }
  });
});

app.listen(port, (error) => {
  if (error) {
    console.error(error); // eslint-disable-line no-console
  } else {
    console.info(`Child one app: http://localhost:${port}/`); // eslint-disable-line no-console
  }
});
