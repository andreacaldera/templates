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
      <Link className="navbar-brand" to="/">Redux template</Link>

      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="navbar-nav mr-auto">
          <li className={`nav-item ${activePage === 'home' ? 'active' : ''}`}>
            <Link className="nav-link" to="/" onClick={() => setActivePage('home')}>Home</Link>
          </li>
          <li className={`nav-item ${activePage === 'timer' ? 'active' : ''}`}>
            <Link className="nav-link" to="/timer" onClick={() => setActivePage('timer')}>Timer</Link>
          </li>
          <li className={`nav-item ${activePage === 'politics' ? 'active' : ''}`}>
            <Link className="nav-link" to="/politics" onClick={() => setActivePage('politics')}>Politics</Link>
          </li>
          <li className={`nav-item ${activePage === 'about' ? 'active' : ''}`}>
            <Link className="nav-link" to="/about" onClick={() => setActivePage('about')}>About</Link>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="text" placeholder="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
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
