import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { LISTEN_SPEECH, SELECT_POLITICIAN, VOTE } from '../modules/politics/constants';
import politicsModule from '../modules/politics';

const Politics = ({ listenSpeech, vote, politician, speech, onPoliticialSelect }) =>
  (<div>
    <h1>Politics, what a fun game!</h1>
    <form>
      <select name="politicial-speech" onChange={onPoliticialSelect}>
        <option value="" selected>Select one politician...</option>
        <option value="jeremy-corbyn">Jeremy Corbyn</option>
        <option value="theresa-may">Theresa May</option>
      </select>
      <input type="submit" value="Listen" onClick={listenSpeech} />
      <input type="submit" value="Vote" onClick={vote} />
    </form>
    {politician && (<p>{politician}</p>)}
    {speech && (<p>{speech}</p>)}
  </div>);

Politics.propTypes = {
  politician: PropTypes.string,
  speech: PropTypes.string,
  listenSpeech: PropTypes.func.isRequired,
  vote: PropTypes.func.isRequired,
  onPoliticialSelect: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  politician: politicsModule.getPolitician(state),
  speech: politicsModule.getSpeech(state),
});

const mapDispatchToProps = (dispatch) => ({
  listenSpeech(e) {
    e.preventDefault();
    dispatch({ type: LISTEN_SPEECH });
  },
  onPoliticialSelect(e) {
    const politician = e.target.value;
    dispatch({ type: SELECT_POLITICIAN, politician });
  },
  vote(e) {
    const politician = e.target.value;
    dispatch({ type: VOTE, politician });
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(Politics);
