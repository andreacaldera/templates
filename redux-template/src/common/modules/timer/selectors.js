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

module.exports = {
  getConfig,
  getStatus,
};
