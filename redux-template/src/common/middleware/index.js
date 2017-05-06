import fetch from 'isomorphic-fetch';
import meta from '../modules/meta';
import { SUBMITTING } from '../modules/meta/constants';

import timer from '../modules/timer';
import { START, STOP } from '../modules/timer/constants';

module.exports = (store) => (next) => (action) => Promise.resolve()
    .then(() => {
      const state = store.getState();

      let ticker;

      switch (action.type) {
        case START: {
          const duration = timer.getConfig(state).duration * 1000;
          next(action);
          const endTime = Date.now() + duration;
          ticker = setInterval(() => {
            store.dispatch(timer.setRemaining(endTime - Date.now()));
          },
          1000);
          setTimeout(() => {
            clearInterval(ticker);
            store.dispatch((timer.stop()));
          },
          duration);
          break;
        }
        case STOP: {
          next(action);
          clearInterval(ticker);
          break;
        }
        case SUBMITTING: {
          return fetch('http://localhost:3001/api/test')
            .then((response) => {
              if (response.status >= 400) {
                throw new Error('Bad response from server');
              }
              return response.json();
            })
            .then((json) => store.dispatch((meta.submitted(json))))
            .then(() => next(action));
        }
        default: return next(action);
      }
    })
    .catch((err) => {
      // TODO
      throw err;
      // const status = err.displayStatus || 'appStatuses.ERROR';
      // const message = err.displayMessage || err.message;
    //   return store.dispatch(meta.setAppStatus(status, message, err));
    });

// TODO optimist update
//   const beginAction = getBeginAction(action);
//   return Promise.resolve()
//     .then(() => next(beginAction))
//     .then(() => setStatuses(action.payload, beginAction.optimist.id));
