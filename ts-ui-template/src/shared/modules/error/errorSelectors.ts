import { createSelector } from 'reselect'
import { getRootSelector } from '../selectors'

export const getError = createSelector(getRootSelector, ({ error }) => error || null)
