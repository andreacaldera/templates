import { combineReducers } from 'redux';

import { SELECT_POLITICIAN, SPEECH, VOTE_CASTED, VOTE_ERROR } from './constants';

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

const voteError = (state = null, action) => {
  switch (action.type) {
    case VOTE_ERROR: return action.error;
    default: return state;
  }
};

const votes = (state = {}, action) => {
  switch (action.type) {
    case VOTE_CASTED: {
      const politicialVotes = (state[action.politician] || 0) + 1;
      return Object.assign({}, state, { [action.politician]: politicialVotes });
    }
    default: return state;
  }
};

module.exports = combineReducers({
  politician,
  speech,
  votes,
  voteError,
});
