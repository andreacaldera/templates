import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import meta from '../modules/meta';

const Home = ({ testMeta }) =>
(<div>
  <h2>Home: {testMeta}</h2>
</div>);

Home.propTypes = {
  testMeta: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  testMeta: meta.getTestMeta(state),
});

const mapDispatchToProps = (/* dispatch */) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
