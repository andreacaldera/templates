import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getProductsInBag } from '../modules/selectors';

class App extends Component {
  static propTypes = {
    productsInBag: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  static defaultProps = {
    selectedProductId: null,
  };

  render() {
    const { productsInBag } = this.props;

    const basket = productsInBag.length === 0 ?
      (
        <i>Your basket is empty.</i>
      ) :
      (
        <ul>
          {productsInBag.map((product) => (
            <li>{product.name}</li>
          ))}
        </ul>
      );

    return (
      <div className="container">
        <h2>Micro UI checkout application</h2>
        <h3>Your basket</h3>
        {basket}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  productsInBag: getProductsInBag(state),
});

export default connect(mapStateToProps, null)(App);
