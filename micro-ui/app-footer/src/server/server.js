import Express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import cors from 'cors';

import Footer from '../common/components/Footer';
import { APP_CONTAINER_ID } from '../common/constants';

const app = Express();
const port = 6001;

app.use(cors());

app.use(cookieParser());

function renderFullPage(content) {
  return `
    <!doctype html>
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="http://localhost:${port}/dist/app-footer.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
      <title>Footer</title>
      </head>
      <body>
        <div id="${APP_CONTAINER_ID}">${content}</div>
        <script src="http://localhost:${port}/dist/app-footer.js"></script>
      </body>
    </html>
    `;
}

function renderEmbeddedApp(content) {
  return `
    <div id="${APP_CONTAINER_ID}">${content}</div>
  `;
}

app.use('/dist', Express.static(path.join(__dirname, '../../dist')));

app.use('/favicon.ico', (req, res) => res.sendStatus(200));

app.use((req, res) => {
  const content = renderToString(
    <Footer />
  );
  const html = req.url.endsWith('?embedded') ? // TODO use url-pattern
    renderEmbeddedApp(content) :
    renderFullPage(content);
  res.send(html);
});

app.listen(port, (error) => {
  if (error) {
    console.error(error); // eslint-disable-line no-console
  } else {
    console.info(`Child one app: http://localhost:${port}/`); // eslint-disable-line no-console
  }
});
