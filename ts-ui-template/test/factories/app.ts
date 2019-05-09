import express from 'express'
import bodyParser from 'body-parser'
import { createRouter } from '../../src/server/routes'
import { UserRequest } from '../../src/server/middleware/authentication'
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

export function testApp(context: AppContext = {}): express.Express {
  const app = express()

  app.use(bodyParser.json())

  // test

  app.use((req: UserRequest, _, next) => {
    req.user = {
      email: '',
      groups: [],
      name: '',
      ...context.user,
    }
    next()
  })

  app.use(
    '/',
    createRouter({
      config,
      isCsrfEnabled: false,
      mongo: { items: jest.fn(), purchases: jest.fn(), status: (): string => 'OK' },
    }),
  )

  setErrorHandlers({ app })
  return app
}
