import { createSelector } from 'reselect';

import { getRootSelector } from '../selectors';

const getModuleSelector = createSelector(
  getRootSelector,
  ({ timer }) => timer
);

const getConfig = createSelector(
  getModuleSelector,
  ({ config }) => config
);

const getStatus = createSelector(
  getModuleSelector,
  ({ status }) => status
);

const getRemaining = createSelector(
  getModuleSelector,
  ({ remaining }) => remaining
);

module.exports = {
  getConfig,
  getStatus,
  getRemaining,
};
