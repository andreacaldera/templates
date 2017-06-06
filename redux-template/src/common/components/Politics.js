import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { LISTEN_SPEECH, SELECT_POLITICIAN, VOTE } from '../modules/politics/constants';
import politicsModule from '../modules/politics';

const Politics = ({ listenSpeech, vote, politicianVotes, politician, speech, voteError, onPoliticialSelect }) => {
  const voteErrorComponent = voteError &&
    (<div className="alert alert-danger" role="alert">
      {voteError}
    </div>);
  const speechComponent = speech && (
    <div className="alert alert-success" role="alert">
      <strong>{politician}</strong> speech: {speech}
    </div>);
  const votesComponent = politician && (
    <div className="alert alert-success" role="alert">
      <strong>{politician}</strong> votes: {politicianVotes}
    </div>);

  return (
    <div>
      <h1>Politics, what a fun game!</h1>
      <form>
        {voteErrorComponent}
        <div className="form-group">
          <label htmlFor="politician">Politician</label>
          <select className="form-control" id="politician" name="politicial-speech" onChange={onPoliticialSelect} defaultValue="">
            <option value="">Select one politician...</option>
            <option value="jeremy-corbyn">Jeremy Corbyn</option>
            <option value="theresa-may">Theresa May</option>
          </select>
        </div>
        <input className="btn btn-primary speech" type="submit" value="Listen" onClick={listenSpeech} />
        <input className="btn btn-primary vote" type="submit" value="Vote" onClick={vote} />
      </form>
      {speechComponent}
      {votesComponent}
    </div>);
};

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
