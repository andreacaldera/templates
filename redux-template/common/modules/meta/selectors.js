const { createSelector } = require('reselect');

const getRootSelector = (state) => state.meta; // TODO add namespace

const getTestMeta = createSelector(
  getRootSelector,
  ({ testMeta }) => testMeta
);

const getToggles = createSelector(
  getRootSelector,
  ({ toggles }) => toggles
);

module.exports = {
  getTestMeta,
  getToggles,
};
