import { SET_TEST_META, SUBMITTING, SUBMITTED } from './constants';

const setTestMeta = (value) => ({
  type: SET_TEST_META,
  payload: value,
});

const submit = () => ({
  type: SUBMITTING,
});

const submitted = (payload) => ({
  type: SUBMITTED,
  payload,
});

module.exports = {
  setTestMeta,
  submit,
  submitted,
};
