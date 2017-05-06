import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import timer from '../modules/timer';

const Timer = ({ config, status, start, stop, remaining }) =>
  (<div>
    <h1>Timer</h1>
    <p>Current status is: {status}</p>
    {(status === 'running' && <p>Remaining time: {remaining}</p>)}
    <p>Running for {config.duration} seconds</p>
    <button onClick={start}>Start</button>
    <button onClick={stop}>Stop</button>
  </div>);

Timer.propTypes = {
  config: PropTypes.shape({ duration: PropTypes.number.isRequired }).isRequired,
  status: PropTypes.string.isRequired,
  remaining: PropTypes.number.isRequired,
  start: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  status: timer.getStatus(state),
  config: timer.getConfig(state),
  remaining: timer.getRemaining(state),
});

const mapDispatchToProps = (dispatch) => ({
  start(e) {
    e.preventDefault();
    dispatch(timer.start());
  },
  stop(e) {
    e.preventDefault();
    dispatch(timer.stop());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
