const { createSelector } = require('reselect');

const getRootSelector = (state) => state.meta; // TODO add namespace

const getTestMeta = createSelector(
  getRootSelector,
  ({ testMeta }) => testMeta
);

module.exports = {
  getTestMeta,
};
