import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { renderRoutes } from 'react-router-config';

import { ROUTE_CHANGED } from '../modules/constants';

const App = ({ route, history, routeChanged }) => {
  routeChanged(history.location.pathname);
  return (
    <div>
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


export default connect(null, mapDispatchToProps)(App);
