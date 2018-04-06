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

import config from '../../config/default';

import logger from './logger';

import configureStore from '../common/store/configure-store';
import routes from '../common/routes';
import { NAMESPACE } from '../common/modules/constants';
import api from './api';

const app = Express();
const port = 3001;

const urlPattern = new UrlPatter('/:activePage(/:productId)');

app.use(cookieParser());

function renderFullPage(content, appsContent, store) {
  const cssLinks = config.apps.map((appConfig) =>
    `<link rel="stylesheet" type="text/css" href="http://localhost:${appConfig.port}${appConfig.cssPath}" />`
  ).join(' ');

  const jsLinks = config.apps.map((appConfig) =>
    `<script src="http://localhost:${appConfig.port}${appConfig.jsPath}"></script>`
  ).join(' ');

  const appsHtml = appsContent.map((appContent) =>
    `<div id="${appContent.containerId}">${appContent.html}</div>`
  ).join(' ');

  return `
    <!doctype html>
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="http://localhost:${port}/dist/app-shop.css" />
        ${cssLinks}
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
      <title>Shop</title>
      </head>
      <body>
        <div id="app">${content}
          ${appsHtml}
        </div>
        <script>window.__PARENT_APP_INITIAL_STATE__ = ${JSON.stringify(store.getState()).replace(/</g, '\\x3c')}</script>
        <script src="http://localhost:${port}/dist/app-shop.js"></script>
        ${jsLinks}
      </body>
    </html>
    `;
}

app.use('/dist', Express.static(path.join(__dirname, '../../dist')));

app.use('/api', api());

app.use('/favicon.ico', (req, res) => res.sendStatus(200));

const loadAppContent = (url, appConfig) => {
  if (!url.match(new RegExp(appConfig.urlPathRegex))) {
    return {
      html: '',
      containerId: appConfig.containerId,
    };
  }
  return superagent.get(`http://localhost:${appConfig.port}${url}?embedded`)
    .then(({ text }) => ({
      html: text,
      containerId: appConfig.containerId,
    }))
    .catch((err) => {
      logger.error(`Unable to load ${appConfig.name}`, err);
      return {
        html: '',
        containerId: appConfig.containerId,
      };
    });
};

app.use((req, res) => {
  const activePage = _.get(urlPattern.match(req.url), 'activePage', 'home');

  return Promise.all(config.apps.map((appConfig) => loadAppContent(req.url, appConfig)))
    .then((appsContent) => {
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
          res.send(renderFullPage(content, appsContent, store));
        }
      });
    });
});

app.listen(port, (err) => {
  if (err) {
    logger.error('Unable to start app listener', err);
  } else {
    logger.info(`Redux template: http://localhost:${port}/`);
  }
});
