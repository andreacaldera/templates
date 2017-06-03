import { delay } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { START, STOP, REMAINING } from './constants';

export function* start() {
  const duration = 5 * 1000;
  const endTime = Date.now() + duration;
  yield put({ type: REMAINING, remaining: duration });

  while (Date.now() <= endTime) {
    yield call(delay, 1000);
    const remaining = endTime - Date.now();
    yield put({ type: REMAINING, remaining });
  }
  yield put({ type: STOP });
}

export function* watchStart() {
  yield takeLatest(START, start);
}

export default [watchStart];
