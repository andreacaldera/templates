import { createSelector } from 'reselect';

import { getTimereSelector } from '../selectors';

const getConfig = createSelector(
  getTimereSelector,
  ({ config }) => config
);

const getStatus = createSelector(
  getTimereSelector,
  ({ status }) => status
);

const getRemaining = createSelector(
  getTimereSelector,
  ({ remaining }) => remaining
);

module.exports = {
  getConfig,
  getStatus,
  getRemaining,
};
