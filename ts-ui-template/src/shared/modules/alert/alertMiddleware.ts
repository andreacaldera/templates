import { Middleware } from 'redux'
import { isType, Action } from 'typescript-fsa'
import { createAlert } from '../alert/alertActions'

export const alertMiddleware: Middleware = store => {
  return next => async (action: Action<any>) => {
    next(action)

    if (isType(action, createAlert)) {
      if (action.payload.focus) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
      return
    }
  }
}
