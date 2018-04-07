import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { NAMESPACE, CHECKOUT } from './constants';

const productsInBag = (state = [], action) => {
  switch (action.type) {
    case CHECKOUT:
      return action.payload;
    default: return state;
  }
};

const appReducers = combineReducers({
  productsInBag,
});

module.exports = combineReducers({ routing: routerReducer, [NAMESPACE]: appReducers });
