import { combineReducers } from 'redux';
import counter from './counter';
import meta from '../modules/meta/reducers';

const rootReducer = combineReducers({
  counter,
  meta,
});

export default rootReducer;
