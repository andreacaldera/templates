import Express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import qs from 'qs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import _ from 'lodash';

import { NAMESPACE } from '../common/modules/constants';
import configureStore from '../common/store/configureStore';
import App from '../common/containers/App';

const app = new Express();
const port = 3001;

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="http://localhost:3001/dist/reduxTemplate.css" />
        <title>Redux Template</title>
      </head>
      <body>
        <h1>Redux template</h1>
        <div id="app">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
        </script>
        <script src="http://localhost:3001/dist/reduxTemplate.js"></script>
      </body>
    </html>
    `;
}

function getActiveFeatureToggles(req) {
  const params = qs.parse(req.query);
  const activeFeatureToggles = (params['feature-toggles'] !== undefined ?
    _.compact(params['feature-toggles']) :
    req.cookies.featureToggles);
  return activeFeatureToggles || [];
}

function handleRender(req, res) {
  const activeFeatureToggles = getActiveFeatureToggles(req);
  res.cookie('featureToggles', activeFeatureToggles);
  const preloadedState = { [NAMESPACE]: { meta: { featureToggles: activeFeatureToggles } } };
  const store = configureStore(preloadedState);
  const html = renderToString(<Provider store={store}><App /></Provider>);
  res.send(renderFullPage(html, store.getState()));
}

app.use(cookieParser());
// app.use(favicon(path.join(__dirname, '../favicon.ico')))
app.use('/dist', Express.static(path.join(__dirname, '../dist')));
app.use(handleRender);

app.listen(port, (error) => {
  if (error) {
    console.error(error); // eslint-disable-line no-console
  } else {
    console.info(`Redux template: http://localhost:${port}/`); // eslint-disable-line no-console
  }
});
