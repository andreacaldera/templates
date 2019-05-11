import express from 'express'
import bodyParser from 'body-parser'
import { createRouter } from '../../src/server/routes'
import { config } from '../../src/server/infra/config'
import { createAndConfigureApp } from '../../src/server'
import { setErrorHandlers } from '../../src/server/errorHandlers'

export function testFullApp() {
  return createAndConfigureApp({
    config,
  }).app
}

type AppContext = Partial<{
  user: Partial<{
    name: string
    groups: string[]
    email: string
  }>
}>

export function testApp(_: AppContext = {}): express.Express {
  const app = express()

  app.use(bodyParser.json())

  app.use(
    '/',
    createRouter({
      config,
      isCsrfEnabled: false,
    }),
  )

  setErrorHandlers({ app })
  return app
}
