import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';
import SomeComponent from './components/SomeComponent';
import NotFound from './components/NotFound';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="about" component={About} />
    <Route path="products" component={Products} />
    <Route path="products/*" component={Products} />
    <Route path="some-component" component={SomeComponent} />
    <Route path="*" component={NotFound} />
  </Route>
);

export default routes;
