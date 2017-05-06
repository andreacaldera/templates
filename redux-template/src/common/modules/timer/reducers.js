import { combineReducers } from 'redux';
import { START, STOP, SET_REMAINING } from './constants';

const config = (state = { duration: 5 }) => state;

const status = (state = 'not started yet', action) => {
  switch (action.type) {
    case START:
      return 'running';
    case STOP:
      return 'stopped';
    default:
      return state;
  }
};

const remaining = (state = 0, action) => {
  switch (action.type) {
    case SET_REMAINING:
      return Math.round(Math.max(0, action.payload) / 1000);
    default: return state;
  }
};


module.exports = combineReducers({
  status,
  config,
  remaining,
});
