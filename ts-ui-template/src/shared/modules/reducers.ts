import { combineReducers } from 'redux'
import { alert } from './alert'
import { error } from './error'
import { meta } from './meta'

export default combineReducers({
  alert,
  error,
  meta,
})
