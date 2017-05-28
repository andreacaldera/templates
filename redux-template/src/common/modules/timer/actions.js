import { put } from 'redux-saga/effects';

import { START, STOP, SET_REMAINING } from './constants';

export function* start() {
  yield put({ type: START });
}

export function* stop() {
  yield put({ type: STOP });
}

export function* setRemaining(payload) {
  yield put({ type: SET_REMAINING, payload });
}
