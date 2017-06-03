import { createSelector } from 'reselect';

import { getPoliticsSelector } from '../selectors';

const getPolitician = createSelector(
  getPoliticsSelector,
  ({ politician }) => politician
);

const getSpeech = createSelector(
  getPoliticsSelector,
  ({ speech }) => speech
);

module.exports = {
  getPolitician,
  getSpeech,
};
