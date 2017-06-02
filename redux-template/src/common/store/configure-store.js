import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import reducer from '../modules';
import sagas from '../modules/sagas';
import actionMiddleware from '../middleware';

const configureStore = (history, initialState) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware,
        createLogger,
        actionMiddleware,
      ),
    )
  );

  sagaMiddleware.run(sagas);

  return store;
};


export default configureStore;
