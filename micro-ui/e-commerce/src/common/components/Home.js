import React from 'react';
import { connect } from 'react-redux';

const Home = () =>
(<div>
  <h1>Welcome to your favourite micro UI e-commerce website</h1>
</div>);

Home.propTypes = {
};

export default connect(null, null)(Home);
