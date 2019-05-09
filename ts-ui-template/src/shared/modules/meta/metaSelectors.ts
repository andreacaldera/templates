import { createSelector } from 'reselect'

import { getMetaSelector } from '../selectors'

export const getConfig = createSelector(
  getMetaSelector,
  ({ config }) => config,
)

export const getImageBaseUrl = createSelector(
  getConfig,
  ({ imageBaseUrl }) => imageBaseUrl,
)

export const isLoading = createSelector(
  getMetaSelector,
  (metaState) => metaState.isLoading,
)

export const isPrivacyAccepted = createSelector(
  getMetaSelector,
  ({ privacyAccepted }) => privacyAccepted,
)

export const isSellerDemo = createSelector(
  getMetaSelector,
  ({ sellerDemo }) => sellerDemo,
)
