import express from 'express'
import bodyParser from 'body-parser'
import webpackConfig from '../../webpack.config'
import { setErrorHandlers } from './errorHandlers'
import { createRouter } from './routes'
import { AddressInfo } from 'net'
import { createAuthenticationMiddleware } from './middleware/authentication'
import { mongoStore } from './db/mongoStore'
import { Config } from './infra/config'
import { logger } from './infra/logger'
const path = require('path')

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const webpackConfigWithMode = Object.assign({ mode: 'development' }, webpackConfig)
const compiler = webpack(webpackConfigWithMode)

type AppContext = {
  config: Config
}

interface App {
  app: express.Express
  startApp: () => Promise<{}>
}

export function createAndConfigureApp({ config }: AppContext): App {
  const app = express()

  if (process.env.WATCH_MODE === 'true') {
    app.use(
      webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
      }),
    )
    app.use(webpackHotMiddleware(compiler))
  }

  return { app, startApp }

  async function startApp() {
    const mongo = await mongoStore(config.mongo)

    app.use('/', express.static(path.resolve('public')))
    app.use(webpackConfig.output.publicPath, express.static(webpackConfig.output.path))

    app.use(
      '/',
      createRouter({
        config,
        isCsrfEnabled: true,
        mongo,
      }),
    )

    app.use(bodyParser.json())
    app.use(createAuthenticationMiddleware({ config }))

    setErrorHandlers({ app })

    return new Promise((resolve, reject) => {
      try {
        const server = app.listen(config.port, () => {
          const address = server.address() as AddressInfo
          logger.info(`Started on port ${address.port}`)
          return resolve()
        })
        server.once('error', (err) => {
          return reject(err)
        })
      } catch (err) {
        reject(err)
      }
    })
  }
}
