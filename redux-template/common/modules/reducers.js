import { combineReducers } from 'redux';
import meta from './meta';
import timer from './timer';

import { NAMESPACE } from './constants';

const rootReducer = combineReducers({
  meta,
  timer,
});

module.exports = combineReducers({ [NAMESPACE]: rootReducer });
