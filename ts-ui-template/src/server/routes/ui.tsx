import { Response, RequestHandler, Request } from 'express'
import superagent from 'superagent'
import React from 'react'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { createMemoryHistory } from 'history'
import configureStore from '../../shared/store/configureStore'
import manifest from '../../../public/manifest.json'
import { path } from 'ramda'
import pathToRegexp from 'path-to-regexp'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

import { INITIAL_INSTAGRAM, State } from '../../shared/modules/state'
import { Config } from '../infra/config'
import { logger } from '../infra/logger'
import { StaticRouter } from 'react-router'
import { renderRoutes } from 'react-router-config'
import { routes } from '../../shared/routes'

const FAVICON = `
  <link
    rel="apple-touch-icon"
    sizes="57x57"
    href="/images/favicon/apple-icon-57x57.png"
  />
  <link
    rel="apple-touch-icon"
    sizes="60x60"
    href="/images/favicon/apple-icon-60x60.png"
  />
  <link
    rel="apple-touch-icon"
    sizes="72x72"
    href="/images/favicon/apple-icon-72x72.png"
  />
  <link
    rel="apple-touch-icon"
    sizes="76x76"
    href="/images/favicon/apple-icon-76x76.png"
  />
  <link
    rel="apple-touch-icon"
    sizes="114x114"
    href="/images/favicon/apple-icon-114x114.png"
  />
  <link
    rel="apple-touch-icon"
    sizes="120x120"
    href="/images/favicon/apple-icon-120x120.png"
  />
  <link
    rel="apple-touch-icon"
    sizes="144x144"
    href="/images/favicon/apple-icon-144x144.png"
  />
  <link
    rel="apple-touch-icon"
    sizes="152x152"
    href="/images/favicon/apple-icon-152x152.png"
  />
  <link
    rel="apple-touch-icon"
    sizes="180x180"
    href="/images/favicon/apple-icon-180x180.png"
  />
  <link
    rel="icon"
    type="image/png"
    sizes="192x192"
    href="/images/favicon/android-icon-192x192.png"
  />
  <link
    rel="icon"
    type="image/png"
    sizes="32x32"
    href="/images/favicon/favicon-32x32.png"
  />
  <link
    rel="icon"
    type="image/png"
    sizes="96x96"
    href="/images/favicon/favicon-96x96.png"
  />
  <link
    rel="icon"
    type="image/png"
    sizes="16x16"
    href="/images/favicon/favicon-16x16.png"
  />
  <meta name="msapplication-TileColor" content="#ffffff" />
  <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
  <meta name="theme-color" content="#ffffff" />
`

const accountUrlPath = pathToRegexp('/app/:accontId')

type ClientContext = {
  config: Config
}

const loadInstagramAccount = async (reqUrl: string) => {
  const instagramHandle = path<string>([1], accountUrlPath.exec(reqUrl))
  if (!instagramHandle) {
    return Promise.resolve(INITIAL_INSTAGRAM)
  }
  const response = await superagent.get(`http://localhost:8888/api/beta-account/${instagramHandle}`)
  return response.body
}

const renderFullApp = (appHtml: string, state: State, sheet: ServerStyleSheet) => {
  return `
  <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <title>TEMPLATE_NAME</title>
      ${FAVICON}
      ${sheet.getStyleTags()}
      <link rel="stylesheet" href="${manifest['commons~main.css']}" />
      <!-- link rel="stylesheet" href="${manifest['main.css']}" / -->
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
        integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
        crossOrigin="anonymous"
      />
    </head>
    <body>
      <div id="app">${appHtml}</div>
      <script>window.__initialState__ = ${JSON.stringify(state).replace(/</g, '\\x3c')}</script>
      <script src="${manifest['main.js']}"></script>
      <script src="${manifest['commons~main.js']}"></script>
    </body>
  </html>
`
}

export function createUiRouter({ config }: ClientContext): RequestHandler {
  return async (req: Request, res: Response, next) => {
    try {
      const sheet = new ServerStyleSheet()
      const history = createMemoryHistory()
      const store = configureStore(
        {
          meta: {
            sellerDemo: false,
            config: {
              baseUrl: config.baseUrl,
              baseApiUrl: config.baseApiUrl,
              isDev: config.isDev,
            },
            privacyAccepted: req.cookies['privacy-accepted'] === 'true',
          },
          instagram: await loadInstagramAccount(req.url),
        },
        history,
      )

      const appHtml = renderToString(
        <StyleSheetManager sheet={sheet.instance}>
          <Provider store={store}>
            <StaticRouter location={req.url}>{renderRoutes(routes as any)}</StaticRouter>
          </Provider>
        </StyleSheetManager>,
      )

      res.send(renderFullApp(appHtml, store.getState(), sheet))
      logger.info('Returning response:status:200')
    } catch (err) {
      next(err)
    }
  }
}
