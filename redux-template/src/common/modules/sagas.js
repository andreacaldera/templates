import { delay } from 'redux-saga';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { START, STOP } from './timer/constants';

export function* startSaga() {
  // console.log('Now running sagas!');
  yield put({ type: 'SAGA_STARTED' });
}

export function* watchAction() {
  yield call(delay, 1000); // Just to demonstrate delay
  // console.log('Watching action...');
  // yield put({ type: 'INCREMENT' }); // Do sommething here
}

export function* watchActions() {
  yield takeEvery('*', watchAction);
}

/** TODO AC 02/06 move to timer module **/
export function* start() {
  yield call(delay, 5000);
  yield put({ type: STOP });
}

export function* watchStart() {
  yield takeLatest(START, start);
}

export default function* rootSaga() {
  yield [
    startSaga(),
    watchActions(),
    watchStart(),
  ];
}
