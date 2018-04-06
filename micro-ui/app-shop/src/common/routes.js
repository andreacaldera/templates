import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';
import Checkout from './components/Checkout';
import NotFound from './components/NotFound';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="about" component={About} />
    <Route path="products" component={Products} />
    <Route path="products/*" component={Products} />
    <Route path="checkout*" component={Checkout} />
    <Route path="*" component={NotFound} />
  </Route>
);

export default routes;
