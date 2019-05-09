import { createStore, compose, applyMiddleware, Middleware } from 'redux'
import createLogger, { LoggerPredicate } from 'redux-logger'
import { path } from 'ramda'
import { createHistoryMiddleware, createPrivateMiddleware } from '../modules/middleware'
import { reducer } from '../modules'
import { State } from '../modules/state'
import { History } from 'history'
import { alertMiddleware } from '../modules/alert/alertMiddleware'
import { instagramMiddleware } from '../modules/instagram/instagramMiddleware'

const FILTER_LOGGED_ACTION = ['ACTION TO FILTER HERE']

const configureStore = (state: DeepPartial<State>, history: History) => {
  const predicate: LoggerPredicate = (_, { type }) => !FILTER_LOGGED_ACTION.includes(type)
  const logger = (path(['meta', 'config', 'isDev'], state)
    ? ((createLogger as any)({ predicate }) as Middleware)
    : null) as Middleware

  const middlewares = [
    createHistoryMiddleware(history),
    createPrivateMiddleware(),
    instagramMiddleware,
    alertMiddleware,
    logger,
  ].filter(Boolean)

  const store = createStore(reducer, state as any, compose(applyMiddleware(...middlewares)))

  return store
}

export default configureStore
