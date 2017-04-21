import { createSelector } from 'reselect';

import { getRootSelector } from '../selectors';

const getModuleSelector = createSelector(
  getRootSelector,
  ({ meta }) => meta
);

const getTestMeta = createSelector(
  getModuleSelector,
  ({ testMeta }) => testMeta
);

const getFeatureToggles = createSelector(
  getModuleSelector,
  ({ featureToggles }) => featureToggles
);

const getPage = createSelector(
  getModuleSelector,
  ({ page }) => page
);

module.exports = {
  getTestMeta,
  getFeatureToggles,
  getPage,
};
