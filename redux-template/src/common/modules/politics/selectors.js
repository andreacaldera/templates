import { createSelector } from 'reselect';

import { getPoliticsSelector } from '../selectors';

const getPolitician = createSelector(
  getPoliticsSelector,
  ({ politician }) => politician
);

const getSpeech = createSelector(
  getPoliticsSelector,
  ({ speech }) => speech
);


const getVotes = createSelector(
  getPoliticsSelector,
  ({ votes }) => votes
);

const getVoteError = createSelector(
  getPoliticsSelector,
  ({ voteError }) => voteError
);

const getPoliticianVotes = createSelector(
  [getPolitician, getVotes],
  (politician, votes) => votes[politician] || 0
);

module.exports = {
  getPolitician,
  getSpeech,
  getVotes,
  getPoliticianVotes,
  getVoteError,
};
