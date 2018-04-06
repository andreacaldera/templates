import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import meta from '../modules/meta';
import { SET_ACTIVE_PAGE } from '../modules/meta/constants';

const App = ({ children, activePage, setActivePage }) => (
  <div>
    <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse fixed-top">
      <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <Link className="navbar-brand" to="/">Shop</Link>

      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="navbar-nav mr-auto">
          <li className={`nav-item ${activePage === 'home' ? 'active' : ''}`}>
            <Link className="nav-link" to="/" onClick={() => setActivePage('home')}>Home</Link>
          </li>
          <li className={`nav-item ${activePage === 'products' ? 'active' : ''}`}>
            <Link className="nav-link" to="/products" onClick={() => setActivePage('products')}>Products</Link>
          </li>
          <li className={`nav-item ${activePage === 'checkout' ? 'active' : ''}`}>
            <Link className="nav-link" to="/checkout" onClick={() => setActivePage('checkout')}>Checkout</Link>
          </li>
          <li className={`nav-item ${activePage === 'about' ? 'active' : ''}`}>
            <Link className="nav-link" to="/about" onClick={() => setActivePage('about')}>About</Link>
          </li>
        </ul>
      </div>
    </nav>
    <div className="container">
      <div className="starter-template">
        {children}
      </div>
    </div>
  </div>
);

App.propTypes = {
  children: PropTypes.shape().isRequired,
  activePage: PropTypes.string.isRequired,
  setActivePage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activePage: meta.getActivePage(state),
});

const mapDispatchToProps = (dispatch) => ({
  setActivePage(activePage) {
    dispatch({ type: SET_ACTIVE_PAGE, activePage });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
