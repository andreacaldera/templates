import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import meta from '../modules/meta';

// TODO redux-form?

const TestMeta = ({ testMeta, setTestMeta, saveTestMeta }) => (
  <form onSubmit={setTestMeta}>
    <div>
      <label htmlFor="testMeta">Test  meta</label>
      <input name="testMeta" placeholder="testMeta" onBlur={setTestMeta} />
    </div>
    <button onClick={saveTestMeta}>Set test meta</button>
    <div>{testMeta}</div>
  </form>
);

TestMeta.propTypes = {
  setTestMeta: PropTypes.func.isRequired,
  testMeta: PropTypes.string.isRequired,
  saveTestMeta: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  testMeta: meta.getTestMeta(state),
});

const mapDispatchToProps = (dispatch) => ({
  setTestMeta(e) {
    dispatch(meta.setTestMeta(e.target.value));
  },
  saveTestMeta() {
    throw new Error('No implemented yet!');
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TestMeta);
