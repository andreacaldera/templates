// import { eventChannel } from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';

function publish(action) {
  if (action.publish) {
    window.__MICRO_UI__.publish(action);
  }
}

export function* watchActions() {
  yield takeEvery('*', publish);
}

export default function* rootSaga() {
  yield [
    watchActions(),
  ];
}
