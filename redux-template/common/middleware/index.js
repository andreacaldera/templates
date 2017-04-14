import meta from '../modules/meta';

module.exports = (/* store */) => (next) => (action) => Promise.resolve()
    .then(() => {
      switch (action.type) {
        case meta.SET_TEST_META: {
          return next(action);
        //   const beginAction = getBeginAction(action);
        //   return Promise.resolve()
        //     .then(() => next(beginAction))
        //     .then(() => setStatuses(action.payload, beginAction.optimist.id));
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
