import { combineReducers } from 'redux'
import { Config } from '../state'
import { Action, isType } from 'typescript-fsa'
import { loading, privacyAccepted, setSellerDemo } from './metaActions'

const isLoading = (_isLoading = false, action: Action<any>): boolean => {
  if (isType(action, loading)) {
    return action.payload
  }
  return _isLoading
}

const privacyAcceptedReducer = (_privacyAccepted = false, action: Action<any>): boolean => {
  if (isType(action, privacyAccepted)) {
    return action.payload
  }
  return _privacyAccepted
}

const sellerDemoReducer = (_sellerDemo = false, action: Action<any>): boolean => {
  if (isType(action, setSellerDemo)) {
    return action.payload
  }
  return _sellerDemo
}

export const metaReducer = combineReducers({
  config: (config = {}): Config => config as Config,
  isLoading,
  privacyAccepted: privacyAcceptedReducer,
  sellerDemo: sellerDemoReducer,
})
