
import { select, put, takeLatest, takeEvery, call } from 'redux-saga/effects';

import { LISTEN_SPEECH, SPEECH, VOTE, VOTE_CASTED } from './constants';
import { getPolitician } from './selectors';

const getSpeech = (politician) =>
  fetch(`/api/${politician}`)
    .then((response) => response.json());

export function* listenSpeech() {
  const politician = yield select(getPolitician);
  const speech = yield call(getSpeech, politician);
  yield put({ type: SPEECH, speech: speech.message });
}

export function* watchListenSpeech() {
  yield takeLatest(LISTEN_SPEECH, listenSpeech);
}

const doVote = (politician) =>
  fetch(`/api/${politician}`, { method: 'POST' })
    .then((response) => response.json());

export function* vote() {
  const politician = yield select(getPolitician);
  yield call(doVote, politician);
  yield put({ type: VOTE_CASTED, politician });
}

export function* watchVote() {
  yield takeEvery(VOTE, vote);
}

export default [watchListenSpeech, watchVote];
