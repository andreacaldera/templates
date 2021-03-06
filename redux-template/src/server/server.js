import Express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import _ from 'lodash';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import qs from 'qs';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import UrlPatter from 'url-pattern';

import configureStore from '../common/store/configure-store';
import routes from '../common/routes';
import { NAMESPACE } from '../common/modules/constants';
import api from './api';

const app = Express();
const port = 3001;

const urlPattern = new UrlPatter('/:activePage');

app.use(cookieParser());

const getActiveFeatureToggles = (req) => {
  const params = qs.parse(req.query);
  const activeFeatureToggles = (params['feature-toggles'] !== undefined ?
    _.compact(params['feature-toggles']) :
    req.cookies.featureToggles);
  return activeFeatureToggles || [];
};

function renderFullPage(content, store) {
  return `
    <!doctype html>
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="http://localhost:3001/dist/reduxTemplate.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
      <title>Redux Template</title>
      </head>
      <body>
        <div id="app">${content}</div>
        <script>window.__initialState__ = ${JSON.stringify(store.getState()).replace(/</g, '\\x3c')}</script>
        <script src="http://localhost:${port}/dist/reduxTemplate.js"></script>
      </body>
    </html>
    `;
}

app.use('/dist', Express.static(path.join(__dirname, '../../dist')));

app.use('/api', api());

app.use((req, res) => {
  const activePage = _.get(urlPattern.match(req.url), 'activePage', 'home');
  const activeFeatureToggles = getActiveFeatureToggles(req);
  res.cookie('featureToggles', activeFeatureToggles);
  const preloadedState = { [NAMESPACE]: { meta: { activePage, featureToggles: activeFeatureToggles } } };
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
      res.send(renderFullPage(content, store));
    }
  });
});

app.listen(port, (error) => {
  if (error) {
    console.error(error); // eslint-disable-line no-console
  } else {
    console.info(`Redux template: http://localhost:${port}/`); // eslint-disable-line no-console
  }
});
