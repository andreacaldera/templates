import Express from 'express';
import path from 'path';
import qs from 'qs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import _ from 'lodash';

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

function handleRender(req, res) {
  const params = qs.parse(req.query);
  const preloadedState = { meta: { toggles: _.compact(params.toggles) || [] } }; // TODO add namespace
  const store = configureStore(preloadedState);
  const html = renderToString(<Provider store={store}><App /></Provider>);
  res.send(renderFullPage(html, store.getState()));
}

app.use('/dist', Express.static(path.join(__dirname, '../dist')));

app.use(handleRender);

app.listen(port, (error) => {
  if (error) {
    console.error(error); // eslint-disable-line no-console
  } else {
    console.info(`Redux template: http://localhost:${port}/`); // eslint-disable-line no-console
  }
});
