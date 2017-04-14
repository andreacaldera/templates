import { SET_TEST_META } from './constants';

const setTestMeta = (value) => ({
  type: SET_TEST_META,
  payload: value,
});


module.exports = {
  setTestMeta,
};
