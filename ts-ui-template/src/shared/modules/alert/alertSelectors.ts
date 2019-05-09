import { createSelector } from 'reselect'
import { getRootSelector } from '../selectors'

export const getAlert = createSelector(getRootSelector, ({ alert }) => alert || null)

export const hasError = createSelector(getAlert, alert => Boolean(alert && alert.type === 'danger'))
