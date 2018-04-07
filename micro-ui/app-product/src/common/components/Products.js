import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';

import { ADD_TO_BAG, REMOVE_FROM_BAG, CHECKOUT } from '../modules/constants';

import { getProductList, getProductIdsInBag, getSelectedProductId } from '../modules/selectors';

class App extends Component {
  static propTypes = {
    selectedProductId: PropTypes.string,
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
    productIdsInBag: PropTypes.arrayOf(PropTypes.string).isRequired,
    addToBag: PropTypes.func.isRequired,
    checkout: PropTypes.func.isRequired,
  };

  static defaultProps = {
    selectedProductId: null,
  };

  render() {
    const { products, addToBag, checkout, productIdsInBag, selectedProductId } = this.props;
    return (
      <div className="container">
        <h2>Micro UI product application</h2>

        {products.map((product) => (
          <div className={`form-group row ${selectedProductId === product.id ? 'product--selected' : ''}`} key={product.name}>
            <label className="col-10" htmlFor="add-to-bag">{product.name}</label>
            <div className="col-2">
              <div className="form-check">
                <input checked={Boolean(productIdsInBag.find((id) => id === product.id))} id="add-to-bag" className="form-check-input" type="checkbox" onChange={(e) => addToBag(e, product.id)} />Add to bag
              </div>
            </div>
          </div>
        ))}
        <Link className="btn btn-primary" to="/checkout" href="/checkout" onClick={checkout}>Checkout</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: getProductList(state),
  productIdsInBag: getProductIdsInBag(state),
  selectedProductId: getSelectedProductId(state),
});

const mapDispatchToProps = (dispatch) => ({
  addToBag: (e, productId) => {
    dispatch({
      type: e.target.checked ? ADD_TO_BAG : REMOVE_FROM_BAG,
      payload: productId,
    });
  },
  checkout: () => {
    dispatch({
      type: CHECKOUT,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
