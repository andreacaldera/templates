import { createSelector } from 'reselect';
import { NAMESPACE } from './constants';

const getRootSelector = (state) => state[NAMESPACE];

const getMetaSelector = createSelector(
  getRootSelector,
  ({ meta }) => meta
);

const getTimereSelector = createSelector(
  getRootSelector,
  ({ timer }) => timer
);

module.exports = {
  getRootSelector,
  getMetaSelector,
  getTimereSelector,
};
