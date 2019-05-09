import Express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import StaticRouter from 'react-router-dom/StaticRouter';
import { renderRoutes } from 'react-router-config';
import UrlPatter from 'url-pattern';
import _ from 'lodash';
import cors from 'cors';

import configureStore from '../common/store/configure-store';
import Products from '../common/components/Products';
import routes from '../common/routes';
import { NAMESPACE } from '../common/modules/constants';
import api from './api';
import { APP_CONTAINER_ID, APP_REDUX_STATE_ID, APP_PATTERN } from '../common/constants';

const urlPattern = new UrlPatter(APP_PATTERN);

const products = {
  one: {
    id: 'one',
    name: 'Pretty little red dress',
  },
  two: {
    id: 'two',
    name: 'Some shoes whatevs',
  },
  three: {
    id: 'three',
    name: 'Skinny hipster jeans',
  },
};

const app = Express();
const port = 4001;

app.use(cors());

app.use(cookieParser());

function renderFullPage(content, store) {
  return `
    <!doctype html>
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="http://localhost:${port}/dist/app-product.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
      <title>Product</title>
      </head>
      <body>
        <div id="${APP_CONTAINER_ID}">${content}</div>
        <script>window.${APP_REDUX_STATE_ID} = ${JSON.stringify(store.getState()).replace(/</g, '\\x3c')}</script>
        <script src="http://localhost:${port}/dist/app-product.js"></script>
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
  const selectedProductId = _.get(urlPattern.match(req.url), 'productId');
  const preloadedState = { [NAMESPACE]: { selectedProductId, products } };

  if (req.headers.accept === 'application/json') {
    return res.json(preloadedState);
  }

  const store = configureStore(preloadedState);

  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        {renderRoutes(routes)}
      </StaticRouter>
    </Provider>
  );
  const html = req.url.endsWith('?embedded') ? // TODO use url-pattern
    renderEmbeddedApp(content, store) :
    renderFullPage(content, store);
  res.send(html);
});

app.listen(port, (error) => {
  if (error) {
    console.error(error); // eslint-disable-line no-console
  } else {
    console.info(`app-product: http://localhost:${port}/`); // eslint-disable-line no-console
  }
});
