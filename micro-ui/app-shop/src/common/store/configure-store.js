import { createStore, compose, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import reducer from '../modules';
import sagas from '../modules/sagas';

const configureStore = (initialState, clientMiddleware, clientSagas) => {
  const sagaMiddleware = createSagaMiddleware();
  const commonMiddlewares = [sagaMiddleware];
  const middlewares = clientMiddleware ? commonMiddlewares.concat(createLogger) : commonMiddlewares;

  const store = createStore(
    reducer,
    initialState,
    compose(applyMiddleware(...middlewares))
  );

  sagaMiddleware.run(sagas);
  if (clientSagas) {
    sagaMiddleware.run(clientSagas);
  }

  return store;
};


export default configureStore;
