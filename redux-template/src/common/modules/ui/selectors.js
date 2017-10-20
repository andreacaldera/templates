import { createSelector } from 'reselect';

import { getUiSelector } from '../selectors';

const getHasReachedPageBottom = createSelector(
  getUiSelector,
  ({ hasReachedPageBottom }) => hasReachedPageBottom
);

module.exports = {
  getHasReachedPageBottom,
};
