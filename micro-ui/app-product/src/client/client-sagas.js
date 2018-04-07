import { takeEvery, put, select } from 'redux-saga/effects';

import { CHECKOUT, ROUTE_CHANGED } from '../common/modules/constants';

import { getProductsInBag } from '../common/modules/selectors';

export function* publishAction() {
  yield takeEvery('*', (action) => {
    if (action.publish) {
      window.__MICRO_UI__.publish(action);
    }
  });
}

export function* publishRouteChange() {
  yield takeEvery(ROUTE_CHANGED, (action) => {
    window.__MICRO_UI__.publish({ ...action, publish: true });
  });
}

export function* checkout(action) {
  if (action.publish) {
    return;
  }
  const products = yield select(getProductsInBag);
  yield put({ type: CHECKOUT, payload: products, publish: true });
}

export function* watchCheckout() {
  yield takeEvery(CHECKOUT, checkout);
}

export default function* rootSaga() {
  yield [
    publishAction(),
    watchCheckout(),
    publishRouteChange(),
  ];
}
