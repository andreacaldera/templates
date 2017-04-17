import { NAMESPACE } from './constants';

const getRootSelector = (state) => state[NAMESPACE];

module.exports = {
  getRootSelector,
};
