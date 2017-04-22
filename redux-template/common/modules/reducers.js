import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import meta from './meta';
import timer from './timer';

import { NAMESPACE } from './constants';

const rootReducer = combineReducers({
  meta,
  timer,
});

module.exports = combineReducers({ routing: routerReducer, [NAMESPACE]: rootReducer });
