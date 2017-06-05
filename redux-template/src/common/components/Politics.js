import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { LISTEN_SPEECH, SELECT_POLITICIAN, VOTE } from '../modules/politics/constants';
import politicsModule from '../modules/politics';

const Politics = ({ listenSpeech, vote, politicianVotes, politician, speech, voteError, onPoliticialSelect }) =>
  (<div>
    <h1>Politics, what a fun game!</h1>
    <form>
      <select name="politicial-speech" onChange={onPoliticialSelect} defaultValue="">
        <option value="">Select one politician...</option>
        <option value="jeremy-corbyn">Jeremy Corbyn</option>
        <option value="theresa-may">Theresa May</option>
      </select>
      <input type="submit" value="Listen" onClick={listenSpeech} />
      <input type="submit" value="Vote" onClick={vote} />
    </form>
    {speech && (<p>{politician}: {speech}</p>)}
    {politician && politicianVotes > 0 && (<p>Politician votes: {politicianVotes}</p>)}
    {voteError && (<p>{voteError}</p>)}
  </div>);

Politics.propTypes = {
  politician: PropTypes.string,
  speech: PropTypes.string,
  listenSpeech: PropTypes.func.isRequired,
  vote: PropTypes.func.isRequired,
  voteError: PropTypes.string.isRequired,
  politicianVotes: PropTypes.number,
  onPoliticialSelect: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  politician: politicsModule.getPolitician(state),
  speech: politicsModule.getSpeech(state),
  voteError: politicsModule.getVoteError(state),
  politicianVotes: politicsModule.getPoliticianVotes(state),
});

const mapDispatchToProps = (dispatch) => ({
  listenSpeech(e) {
    e.preventDefault();
    dispatch({ type: LISTEN_SPEECH });
  },
  onPoliticialSelect(e) {
    dispatch({ type: SELECT_POLITICIAN, politician: e.target.value });
  },
  vote(e) {
    e.preventDefault();
    dispatch({ type: VOTE });
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(Politics);
