import Express from 'express';
import path from 'path';
import qs from 'qs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

import configureStore from '../common/store/configureStore';
import App from '../common/containers/App';
import { fetchCounter } from '../common/api/counter';

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
  // Query our mock API asynchronously
  fetchCounter((apiResult) => {
    // Read the counter from the request, if provided
    const params = qs.parse(req.query);
    const counter = parseInt(params.counter, 10) || apiResult || 0;

    // Compile an initial state
    const preloadedState = { counter };

    // Create a new Redux store instance
    const store = configureStore(preloadedState);

    // Render the component to a string
    // eslint-disable-next-line react/jsx-filename-extension
    const html = renderToString(<Provider store={store}><App /></Provider>);

    // Grab the initial state from our Redux store
    const finalState = store.getState();

    // Send the rendered page back to the client
    res.send(renderFullPage(html, finalState));
  });
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
