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

module.exports = {
  getTestMeta,
  getFeatureToggles,
};
