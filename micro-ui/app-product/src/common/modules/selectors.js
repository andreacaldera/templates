import { createSelector } from 'reselect';
import { NAMESPACE } from './constants';

const getRootSelector = (state) => state[NAMESPACE];

const getProducts = createSelector(
  getRootSelector,
  ({ products }) => products
);

const getProductList = createSelector(
  getRootSelector,
  ({ products }) => Object.values(products)
);

const getProductsInBag = createSelector(
  getRootSelector,
  ({ productsInBag }) => productsInBag
);

const getSelectedProductId = createSelector(
  getRootSelector,
  ({ selectedProductId }) => selectedProductId
);

module.exports = {
  getProducts,
  getProductList,
  getSelectedProductId,
  getProductsInBag,
};
