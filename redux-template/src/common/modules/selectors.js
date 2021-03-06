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

const getPoliticsSelector = createSelector(
  getRootSelector,
  ({ politics }) => politics
);

const getUiSelector = createSelector(
  getRootSelector,
  ({ ui }) => ui
);

module.exports = {
  getRootSelector,
  getMetaSelector,
  getTimereSelector,
  getPoliticsSelector,
  getUiSelector,
};
