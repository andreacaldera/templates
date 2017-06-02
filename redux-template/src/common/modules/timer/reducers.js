import { combineReducers } from 'redux';
import { START, STOP } from './constants';

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

module.exports = combineReducers({
  status,
  config,
});
