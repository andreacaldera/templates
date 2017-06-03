import { combineReducers } from 'redux';
import { START, STOP, REMAINING } from './constants';

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
    case REMAINING:
      return Math.round(Math.max(0, action.remaining) / 1000);
    default: return state;
  }
};

module.exports = combineReducers({
  status,
  config,
  remaining,
});
