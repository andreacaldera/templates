import { combineReducers } from 'redux';

import { HAS_REACHED_PAGE_BOTTOM } from './constants';

const hasReachedPageBottom = (state = false, action) => {
  switch (action.type) {
    case HAS_REACHED_PAGE_BOTTOM:
      return action.hasReachedPageBottom;
    default: return state;
  }
};

module.exports = combineReducers({
  hasReachedPageBottom,
});
