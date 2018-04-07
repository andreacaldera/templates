import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';

class TopNav extends Component {
  static propTypes = {
    activePage: PropTypes.string,
  };

  static defaultProps = {
    activePage: null,
  };

  render() {
    const { activePage } = this.props;
    return (
      <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse fixed-top">
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse">
          <span className="navbar-toggler-icon" />
        </button>
        <Link className="navbar-brand" to="/">Shop</Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className={`nav-item ${activePage === 'home' ? 'active' : ''}`}>
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className={`nav-item ${activePage === 'products' ? 'active' : ''}`}>
              <Link className="nav-link" to="/products">Products</Link>
            </li>
            <li className={`nav-item ${activePage === 'checkout' ? 'active' : ''}`}>
              <Link className="nav-link" to="/checkout">Checkout</Link>
            </li>
            <li className={`nav-item ${activePage === 'about' ? 'active' : ''}`}>
              <Link className="nav-link" to="/about">About</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default connect(null, null)(TopNav);
