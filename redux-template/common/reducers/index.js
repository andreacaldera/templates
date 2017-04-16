import { combineReducers } from 'redux';
import meta from '../modules/meta/reducers';

const rootReducer = combineReducers({
  meta,
});

export default rootReducer;
