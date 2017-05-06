import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import meta from '../modules/meta';

import TimerComponent from './Timer';

const Timer = React.createFactory(TimerComponent);

const TestMeta = ({ testMeta, setTestMeta, saveTestMeta, featureToggles }) => {
  const toggleList = _.isEmpty(featureToggles) ?
    (<p>No feature toggle selected, use ?feature-toggle[]=your-feature-toggle to enable feature toggles</p>) :
    (<div>
      <p>Active featureToggles:</p>
      <ul>
        {featureToggles.map((featureToggle) => (<li key={`${featureToggle}-item`}>{featureToggle}</li>))}
      </ul>
    </div>);
  return (
    <div>
      {toggleList}
      <form>
        <div>
          <label htmlFor="testMeta">Test meta</label>
          <input name="testMeta" placeholder="testMeta" onBlur={setTestMeta} />
        </div>
        <button onClick={saveTestMeta}>Set test meta</button>
        <div>{testMeta}</div>
      </form>
      {Timer()}
    </div>);
};

TestMeta.propTypes = {
  featureToggles: PropTypes.arrayOf(PropTypes.string).isRequired,
  setTestMeta: PropTypes.func.isRequired,
  testMeta: PropTypes.string.isRequired,
  saveTestMeta: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  featureToggles: meta.getFeatureToggles(state),
  testMeta: meta.getTestMeta(state),
});

const mapDispatchToProps = (dispatch) => ({
  setTestMeta(e) {
    dispatch(meta.setTestMeta(e.target.value));
  },
  saveTestMeta(e) {
    e.preventDefault();
    dispatch(meta.submit());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TestMeta);
