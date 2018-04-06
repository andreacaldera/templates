import { eventChannel } from 'redux-saga';
import { call, take, put, cancelled } from 'redux-saga/effects';

function registerSubscribe() {
  return eventChannel((emitter) => {
    window.__MICRO_UI__.subscribe((action) => emitter(action));
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

      yield put({ ...action, type: action.type.replace('APP_PRODUCT_NAMESPACE', 'APP_CHECKOUT_NAMESPACE') });
    }
  } catch (err) {
    if (yield cancelled()) {
      subscribeHandler.close();
    } else {
      yield put({ type: 'ERROR', err }); // TODO
    }
  }
}

export default function* rootSaga() {
  yield [
    subsribe(),
  ];
}
