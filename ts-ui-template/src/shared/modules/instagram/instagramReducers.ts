import { Action, isType } from 'typescript-fsa'
import { accountLoadedAction } from './instagramActions'
import { Instagram } from '../state'

export const instagram = (
  _instagram: Instagram | null = null,
  action: Action<any>,
): Instagram | null => {
  if (isType(action, accountLoadedAction)) {
    return action.payload
  }
  return _instagram
}

export const instagramReducers = instagram
