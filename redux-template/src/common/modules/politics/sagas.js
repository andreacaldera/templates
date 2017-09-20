
import { delay } from 'redux-saga';
import { select, put, takeLatest, takeEvery, call, race } from 'redux-saga/effects';
import superagent from 'superagent';

import { LISTEN_SPEECH, SPEECH, VOTE, VOTE_CASTED, VOTE_ERROR } from './constants';
import { getPolitician } from './selectors';

const callSpeechApi = (politician) =>
  superagent(`/api/speech/${politician}`)
    .then((response) => response.json());

export function* listenSpeech() {
  const politician = yield select(getPolitician);
  const speech = yield call(callSpeechApi, politician);
  yield put({ type: SPEECH, speech: speech.message });
}

export function* watchListenSpeech() {
  yield takeLatest(LISTEN_SPEECH, listenSpeech);
}

const callVoteApi = (politician) =>
  fetch(`/api/vote/${politician}`, { method: 'POST' })
    .then((response) => {
      if (!response.ok) {
        return response.json()
          .then((json) => {
            throw new Error(`An error occured whilst voting for politician ${politician}: ${json.error}`);
          });
      }
      return response.json();
    });

export function* vote() {
  yield put({ type: VOTE_ERROR, error: null });
  const politician = yield select(getPolitician);
  yield put({ type: VOTE_CASTED, politician });
  try {
    const apiResult = yield race({
      result: call(callVoteApi, politician),
      timeout: call(delay, 2000),

    });
    if (apiResult.timeout) {
      throw new Error('Unable to vote, timeout error');
    }
  } catch (error) {
    yield put({ type: VOTE_ERROR, error: error.message, politician });
  }
}

export function* watchVote() {
  yield takeEvery(VOTE, vote);
}

export default [watchListenSpeech, watchVote];
