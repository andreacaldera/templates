import { combineReducers } from 'redux';

import { SET_TEST_META } from './constants';

const testMeta = (state = 'initial value', action) => {
  switch (action.type) {
    case SET_TEST_META:
      return action.payload;
    default:
      return state;
  }
};

const featureToggles = (state = []) => state;

module.exports = combineReducers({
  testMeta,
  featureToggles,
});
