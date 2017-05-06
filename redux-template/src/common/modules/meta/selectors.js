import { createSelector } from 'reselect';

import { getMetaSelector } from '../selectors';

const getTestMeta = createSelector(
  getMetaSelector,
  ({ testMeta }) => testMeta
);

const getFeatureToggles = createSelector(
  getMetaSelector,
  ({ featureToggles }) => featureToggles
);

module.exports = {
  getTestMeta,
  getFeatureToggles,
};
