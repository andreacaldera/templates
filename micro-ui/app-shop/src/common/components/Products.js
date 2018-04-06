import React from 'react';
import { connect } from 'react-redux';

const Products = () => (
  <div>
    <h1>Welcome to products!</h1>
  </div>
);

Products.propTypes = {
};

const mapStateToProps = (/* state */) => ({
});

const mapDispatchToProps = (/* dispatch */) => ({
  // start(e) {
  //   e.preventDefault();
  //   dispatch({ type: START });
  // },
  // stop(e) {
  //   e.preventDefault();
  //   dispatch({ type: STOP });
  // },
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
