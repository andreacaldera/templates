import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import timer from '../modules/timer';
import { START, STOP } from '../modules/timer/constants';

const Timer = ({ config, status, start, stop }) =>
  (<div>
    <h1>Timer</h1>
    <p>Current status is: {status}</p>
    <p>Running for {config.duration} seconds</p>
    <button onClick={start}>Start</button>
    <button onClick={stop}>Stop</button>
  </div>);

Timer.propTypes = {
  config: PropTypes.shape({ duration: PropTypes.number.isRequired }).isRequired,
  status: PropTypes.string.isRequired,
  start: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  status: timer.getStatus(state),
  config: timer.getConfig(state),
});

const mapDispatchToProps = (dispatch) => ({
  start(e) {
    e.preventDefault();
    dispatch({ type: START });
  },
  stop(e) {
    e.preventDefault();
    dispatch({ type: STOP });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
