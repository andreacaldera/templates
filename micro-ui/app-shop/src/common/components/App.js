import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { renderRoutes } from 'react-router-config';

import { ROUTE_CHANGED } from '../modules/meta/constants';
import TopNav from './TopNav';

const App = ({ route, history, routeChanged }) => {
  routeChanged(history.location.pathname);
  return (
    <div className="container">
      <TopNav />
      {renderRoutes(route.routes)}
    </div>
  );
};

App.propTypes = {
  route: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  routeChanged: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  routeChanged: (pathname) => dispatch({
    type: ROUTE_CHANGED,
    payload: pathname,
  }),
});

const mapStateToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
