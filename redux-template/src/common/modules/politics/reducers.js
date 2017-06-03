import { combineReducers } from 'redux';

import { SELECT_POLITICIAN, SPEECH } from './constants';

const politician = (state = null, action) => {
  switch (action.type) {
    case SELECT_POLITICIAN:
      return action.politician;
    default: return state;
  }
};

const speech = (state = null, action) => {
  switch (action.type) {
    case SPEECH: return action.speech;
    default: return state;
  }
};

module.exports = combineReducers({
  politician,
  speech,
});
