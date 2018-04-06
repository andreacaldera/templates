import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import meta from './meta';

import { NAMESPACE } from './constants';

const rootReducer = combineReducers({
  meta,
});

module.exports = combineReducers({ routing: routerReducer, [NAMESPACE]: rootReducer });
