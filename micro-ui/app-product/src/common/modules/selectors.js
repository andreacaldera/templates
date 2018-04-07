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

const getProductIdsInBag = createSelector(
  getRootSelector,
  ({ productIdsInBag }) => productIdsInBag
);

const getProductsInBag = createSelector(
  [getProducts, getProductIdsInBag],
  (products, productIdsInBag) => Object.values(products).filter(({ id }) => productIdsInBag.includes(id))
);

const getSelectedProductId = createSelector(
  getRootSelector,
  ({ selectedProductId }) => selectedProductId
);

module.exports = {
  getProducts,
  getProductList,
  getSelectedProductId,
  getProductIdsInBag,
  getProductsInBag,
};
