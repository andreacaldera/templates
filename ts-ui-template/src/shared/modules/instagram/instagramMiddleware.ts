import superagent from 'superagent'
import { Middleware } from 'redux'
import { isType, Action } from 'typescript-fsa'
import { loadAccountAction, accountLoadedAction, saveTokenAction } from './instagramActions'
import { changeUrl } from '../actions'
import { saveToken } from '../../scraper/api'
import { loading } from '../meta/metaActions'
import { getConfig } from '../meta/metaSelectors'

export const instagramMiddleware: Middleware = (store) => {
  return (next) => async (action: Action<any>) => {
    next(action)

    if (isType(action, loadAccountAction)) {
      store.dispatch(loading(true))
      try {
        const response = await superagent.get(
          `${getConfig(store.getState()).baseApiUrl}beta-account/${action.payload}`,
        )
        store.dispatch(accountLoadedAction(response.body))
        store.dispatch(changeUrl(`/app/${action.payload}`))
      } catch (error) {
        console.error(error)
        // TODO dispatch error action
      }
      store.dispatch(loading(false))
      return
    }

    if (isType(action, saveTokenAction)) {
      const token = action.payload
      await saveToken(token)
      // TODO
      return
    }
  }
}
