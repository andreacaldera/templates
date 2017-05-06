import _ from 'lodash';

import rootReducer from './reducers';
import constants from './constants';
import actions from './actions';
import selectors from './selectors';

const moduleProps = Object.assign({}, actions, selectors, constants);

_.forEach(moduleProps, (prop, propName) => { rootReducer[propName] = prop; });

module.exports = rootReducer;
