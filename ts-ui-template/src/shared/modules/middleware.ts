import { Action, Middleware } from 'redux'
import { History } from 'history'
import { isType } from 'typescript-fsa'
import { changeUrl, urlChanged } from './actions'
import { acceptPrivacy, privacyAccepted } from './meta/metaActions'
import superagent from 'superagent'

export function createHistoryMiddleware(history: History): Middleware {
  return (store) => {
    history.listen((_) => {
      store.dispatch(urlChanged())
    })

    return (next) => (action: Action) => {
      next(action)
      if (isType(action, changeUrl)) {
        history.push(action.payload)
      }
    }
  }
}

export function createPrivacyMiddleware(): Middleware {
  return (store) => {
    return (next) => async (action: Action) => {
      next(action)
      if (isType(action, acceptPrivacy)) {
        store.dispatch(privacyAccepted(true))
        try {
          await superagent.post('/app/accept-privacy')
        } catch {
          // Do nothing?
        }
      }
    }
  }
}
