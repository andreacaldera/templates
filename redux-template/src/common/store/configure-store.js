import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import reducer from '../modules';
import sagas from '../modules/sagas';

const configureStore = (history, initialState, useLogger) => {
  const sagaMiddleware = createSagaMiddleware();
  const router = routerMiddleware(history);

  const middleware = useLogger ?
    applyMiddleware(
      router,
      sagaMiddleware,
      createLogger
    ) :
    applyMiddleware(
      router,
      sagaMiddleware,
    );

  const store = createStore(
    reducer,
    initialState,
    compose(middleware)
  );

  sagaMiddleware.run(sagas);

  return store;
};


export default configureStore;
