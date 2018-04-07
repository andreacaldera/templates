import { eventChannel } from 'redux-saga';
import { takeEvery, call, take, put, cancelled } from 'redux-saga/effects';

import { NAMESPACE } from '../common/modules/constants';
import { ROUTE_CHANGED } from '../common/modules/meta/constants';

function refreshApps({ payload: pathname }) { // TODO move this to client sagas?
  Object.keys(window.__MICRO_UI__.apps).forEach((appName) => {
    const app = window.__MICRO_UI__.apps[appName];
    if (app.isActive(pathname)) {
      app.mount(pathname);
    } else {
      app.unmount();
    }
  });
}

function* routeListener() {
  yield takeEvery(ROUTE_CHANGED, refreshApps);
}

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
      const type = `${NAMESPACE}/${action.type.substring(action.type.indexOf('/') + 1)}`;
      yield put({ ...action, type, publish: false });
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
    routeListener(),
    subsribe(),
  ];
}
