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
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
        <title>Redux Template</title>
      </head>
      <body>
        <h1>Redux template</h1>
        <div id="app">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
        </script>
        <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
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

function handleApi(req, res) {
  res.send({ response: 'Test response' });
}

app.use(cookieParser());
// app.use(favicon(path.join(__dirname, '../favicon.ico')))
app.use('/dist', Express.static(path.join(__dirname, '../dist')));
app.use('/api/', handleApi);
app.use(handleRender);

app.listen(port, (error) => {
  if (error) {
    console.error(error); // eslint-disable-line no-console
  } else {
    console.info(`Redux template: http://localhost:${port}/`); // eslint-disable-line no-console
  }
});
