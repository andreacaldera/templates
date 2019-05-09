import { Action, isType } from 'typescript-fsa'
import { urlChanged } from '../actions'
import { createApplicationError } from './errorActions'
import { ApplicationError } from '../state'

export const error = (
  error: ApplicationError | null = null,
  action: Action<any>
): ApplicationError | null => {
  if (isType(action, urlChanged)) {
    return null
  }

  if (isType(action, createApplicationError)) {
    return action.payload
  }

  return error
}
