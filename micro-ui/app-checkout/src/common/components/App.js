import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ADD_TO_BAG, REMOVE_FROM_BAG } from '../modules/constants';

import { getProductList, getProductsInBag, getSelectedProductId } from '../modules/selectors';

class App extends Component {
  static propTypes = {
    selectedProductId: PropTypes.string,
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
    productsInBag: PropTypes.arrayOf(PropTypes.string).isRequired,
    addToBag: PropTypes.func.isRequired,
  };

  static defaultProps = {
    selectedProductId: null,
  };

  render() {
    const { products, addToBag, productsInBag, selectedProductId } = this.props;
    return (
      <div className="container">
        <h2>Micro UI checkout application</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: getProductList(state),
  productsInBag: getProductsInBag(state),
  selectedProductId: getSelectedProductId(state),
});

const mapDispatchToProps = (dispatch) => ({
  addToBag: (e, productId) => {
    dispatch({
      type: e.target.checked ? ADD_TO_BAG : REMOVE_FROM_BAG,
      payload: productId,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
