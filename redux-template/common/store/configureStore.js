import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const actionMiddleware = require('../middleware');

const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, createLogger, actionMiddleware)
  );
  //
  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('../reducers', () => {
  //     const nextRootReducer = require('../reducers').default
  //     store.replaceReducer(nextRootReducer)
  //   })
  // }

  return store;
};

export default configureStore;
