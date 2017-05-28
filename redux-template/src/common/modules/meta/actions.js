import { put } from 'redux-saga/effects';

import { SET_TEST_META, SUBMITTING, SUBMITTED } from './constants';

export function* setTestMeta(value) {
  yield put(SET_TEST_META, value);
}

export function* submit() {
  yield put(SUBMITTING);
}

export function* submitted(payload) {
  yield put(SUBMITTED, payload);
}
