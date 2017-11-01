import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import uiModule from '../modules/ui';

import FeatureTogglesComponent from './FeatureToggles';

const FeatureToggles = React.createFactory(FeatureTogglesComponent);

const Home = ({ hasReachedPageBottom }) =>
(<div>
  <h1>Home</h1>
  {FeatureToggles()}
  {hasReachedPageBottom && (<div className="home__bottom">You have reached the abyss of this page</div>)}
</div>);

Home.propTypes = {
  hasReachedPageBottom: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  hasReachedPageBottom: uiModule.getHasReachedPageBottom(state),
});

export default connect(mapStateToProps, null)(Home);
