import { createSelector } from 'reselect';
import { NAMESPACE } from './constants';

const getRootSelector = (state) => state[NAMESPACE];

const getProductsInBag = createSelector(
  getRootSelector,
  ({ productsInBag }) => productsInBag
);

module.exports = {
  getProductsInBag,
};
