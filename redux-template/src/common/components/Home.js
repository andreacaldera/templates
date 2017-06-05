import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FeatureTogglesComponent from './FeatureToggles';

const FeatureToggles = React.createFactory(FeatureTogglesComponent);

const Home = () =>
(<div>
  <h2>Home</h2>
  {FeatureToggles()}
</div>);

Home.propTypes = {
  testMeta: PropTypes.string.isRequired,
};

export default connect()(Home);
