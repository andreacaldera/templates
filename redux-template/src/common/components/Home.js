import React from 'react';
import { connect } from 'react-redux';

import FeatureTogglesComponent from './FeatureToggles';

const FeatureToggles = React.createFactory(FeatureTogglesComponent);

const Home = () =>
(<div>
  <h1>Home</h1>
  {FeatureToggles()}
</div>);

export default connect()(Home);
