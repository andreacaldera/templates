import { createSelector } from 'reselect'
import { State } from './state'

export const getRootSelector = (state: State): State => {
  return state
}
export const getMetaSelector = createSelector(
  getRootSelector,
  ({ meta }) => meta,
)
