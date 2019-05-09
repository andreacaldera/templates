import { AlertState } from '../state'
import { Action, isType } from 'typescript-fsa'
import { createAlert } from '../alert/alertActions'
import { urlChanged } from '../actions'

export const alert = (alert: AlertState | null = null, action: Action<any>): AlertState | null => {
  if (isType(action, urlChanged)) {
    return null
  }

  if (isType(action, createAlert)) {
    return action.payload
  }

  return alert
}
