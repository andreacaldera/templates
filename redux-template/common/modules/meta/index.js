const _ = require('lodash');

const rootReducer = require('./reducers');
const constants = require('./constants');
const actions = require('./actions');
const selectors = require('./selectors');

const moduleProps = Object.assign({}, actions, selectors, constants);

_.forEach(moduleProps, (prop, propName) => { rootReducer[propName] = prop; });

module.exports = rootReducer;
