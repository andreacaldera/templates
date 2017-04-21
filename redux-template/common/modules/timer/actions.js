import { START, STOP, SET_REMAINING } from './constants';

const start = () => ({
  type: START,
});

const stop = () => ({
  type: STOP,
});

const setRemaining = (payload) => ({
  type: SET_REMAINING,
  payload,
});

module.exports = {
  start,
  stop,
  setRemaining,
};
