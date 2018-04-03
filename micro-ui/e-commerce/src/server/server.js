import Express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import _ from 'lodash';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import UrlPatter from 'url-pattern';
import superagent from 'superagent';

import configureStore from '../common/store/configure-store';
import routes from '../common/routes';
import { NAMESPACE } from '../common/modules/constants';
import api from './api';

const app = Express();
const port = 3001;

/* Needed for children apps */
const appProductPort = 4001;

const urlPattern = new UrlPatter('/:activePage(/:productId)');

app.use(cookieParser());

function renderFullPage(content, appProductContent = '', store) {
  return `
    <!doctype html>
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="http://localhost:${port}/dist/e-commerce.css" />
        <link rel="stylesheet" type="text/css" href="http://localhost:${appProductPort}/dist/app-product.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
      <title>Redux Template</title>
      </head>
      <body>
        <div id="app">${content}
          <div id="app-product">${appProductContent}</div>
        </div>
        <script>window.__PARENT_APP_INITIAL_STATE__ = ${JSON.stringify(store.getState()).replace(/</g, '\\x3c')}</script>
        <script src="http://localhost:${port}/dist/e-commerce.js"></script>
        <script src="http://localhost:${appProductPort}/dist/app-product.js"></script>
      </body>
    </html>
    `;
}

app.use('/dist', Express.static(path.join(__dirname, '../../dist')));

app.use('/api', api());

app.use('/favicon.ico', (req, res) => res.sendStatus(200));

app.use((req, res) => {
  const activePage = _.get(urlPattern.match(req.url), 'activePage', 'home');
  return Promise.resolve()
    .then(() => {
      if (activePage === 'products') {
        return superagent.get(`http://localhost:4001${req.url}?embedded`)
          .then(({ text }) => text);
      }
    })
    .then((childOneAppContent) => {
      const preloadedState = { [NAMESPACE]: { meta: { activePage } } };
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
          res.send(renderFullPage(content, childOneAppContent, store));
        }
      });
    });
});

app.listen(port, (error) => {
  if (error) {
    console.error(error); // eslint-disable-line no-console
  } else {
    console.info(`Redux template: http://localhost:${port}/`); // eslint-disable-line no-console
  }
});
