import { combineReducers } from 'redux'
import { alert } from './alert'
import { error } from './error'
import { meta } from './meta'
import { instagram } from './instagram'

export default combineReducers({
  alert,
  error,
  meta,
  instagram,
})
