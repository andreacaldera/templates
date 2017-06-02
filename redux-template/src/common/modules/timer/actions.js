import { put } from 'redux-saga/effects';

import { START, STOP, SET_REMAINING } from './constants';

export default {
  start: function* start() {
    yield put({ type: START });
  },
  stop: function* stop() {
    yield put({ type: STOP });
  },
  setRemaining: function* setRemaining(payload) {
    yield put({ type: SET_REMAINING, payload });
  },
};
