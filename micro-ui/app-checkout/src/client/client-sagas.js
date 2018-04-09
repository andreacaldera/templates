import { eventChannel } from 'redux-saga';
import { call, take, put, cancelled } from 'redux-saga/effects';

import { NAMESPACE } from '../common/modules/constants';

function registerSubscribe() {
  return eventChannel((emitter) => {
    if (window.__MICRO_UI__) {
      window.__MICRO_UI__.subscribe((action) => emitter(action));
    }
    const unsubscribe = () => { };
    return unsubscribe;
  });
}

function* subsribe() {
  const subscribeHandler = yield call(registerSubscribe);
  const forever = true;
  try {
    while (forever) {
      const action = yield take(subscribeHandler);
      if (!action.target || action.target === NAMESPACE) {
        const type = `${NAMESPACE}/${action.type.substring(action.type.indexOf('/') + 1)}`;
        yield put({ ...action, type, publish: false });
      }
    }
  } catch (err) {
    if (yield cancelled()) {
      subscribeHandler.close();
    } else {
      yield put({ type: 'ERROR', err });
    }
  }
}

export default function* rootSaga() {
  yield [
    subsribe(),
  ];
}
