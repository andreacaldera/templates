import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from '../modules';
import actionMiddleware from '../middleware';

const configureStore = (history, initialState) => {
  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        thunk,
        createLogger,
        actionMiddleware,
      ),
    )
  );

  return store;
};


export default configureStore;
