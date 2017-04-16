import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import meta from '../modules/meta';

const TestMeta = ({ testMeta, setTestMeta, saveTestMeta, toggles }) => {
  // TODO remove null / empty values from toggles
  const toggleList = _.isEmpty(toggles) ?
    (<p>No toggles selected</p>) :
    (<div>
      <p>Active toggles:</p>
      <ul>
        {toggles.map((toggle) => (<li key={`${toggle}-item`}>{toggle}</li>))}
      </ul>
    </div>);
  return (
    <div>
      {toggleList}
      <form onSubmit={setTestMeta}>
        <div>
          <label htmlFor="testMeta">Test  meta</label>
          <input name="testMeta" placeholder="testMeta" onBlur={setTestMeta} />
        </div>
        <button onClick={saveTestMeta}>Set test meta</button>
        <div>{testMeta}</div>
      </form>
    </div>);
};

TestMeta.propTypes = {
  toggles: PropTypes.array.isRequired,
  setTestMeta: PropTypes.func.isRequired,
  testMeta: PropTypes.string.isRequired,
  saveTestMeta: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  toggles: meta.getToggles(state),
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
