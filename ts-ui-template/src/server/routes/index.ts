import { Router } from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import csrf from 'csurf'
import { createUiRouter } from './ui'
import { Config } from '../infra/config'
import { logger } from '../infra/logger'

type RouterContext = {
  config: Config
  isCsrfEnabled: boolean
}

export function createRouter({ config, isCsrfEnabled = true }: RouterContext): Router {
  const router = Router()

  router.use(bodyParser.urlencoded({ extended: true }))
  router.use(cookieParser())

  if (isCsrfEnabled) {
    router.use(csrf({ cookie: true }))
  }

  router.get('/healthcheck', async (_, res) => {
    res.json({
      status: 'OK',
    })
  })

  router.post('/api/test', async (req, res) => {
    res.json({ result: 'success from test api!' })
  })

  router.post('/accept-privacy', (_, res) => {
    res.cookie('privacy-accepted', 'true')
    res.sendStatus(204)
  })

  router.get('/*', createUiRouter({ config }))

  router.all('/', (_, res) => {
    logger.info('Returning response:status:405')
    res.sendStatus(405)
  })

  return router
}
