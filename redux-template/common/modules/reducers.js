import { combineReducers } from 'redux';
import meta from './meta';

import { NAMESPACE } from './constants';

const rootReducer = combineReducers({
  meta,
});

module.exports = combineReducers({ [NAMESPACE]: rootReducer });
