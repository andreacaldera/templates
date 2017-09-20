import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Home from './components/Home';
import About from './components/About';
import Timer from './components/Timer';
import Politics from './components/Politics';
import NotFound from './components/NotFound';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="about" component={About} />
    <Route path="timer" component={Timer} />
    <Route path="politics" component={Politics} />
    <Route path="*" component={NotFound} />
  </Route>
);

export default routes;
