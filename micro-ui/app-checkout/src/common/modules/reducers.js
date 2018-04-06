import { combineReducers } from 'redux';
import { without } from 'lodash';
import { routerReducer } from 'react-router-redux';

import { NAMESPACE, ADD_TO_BAG, REMOVE_FROM_BAG } from './constants';

const productsInBag = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_BAG:
      return state.concat(action.payload);
    case REMOVE_FROM_BAG:
      return without(state, action.payload);
    default: return state;
  }
};

const appReducers = combineReducers({
  products: (state = {}) => state,
  selectedProductId: (state = null) => state,
  productsInBag,
});

module.exports = combineReducers({ routing: routerReducer, [NAMESPACE]: appReducers });
