import App from './components/App';
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';
import Checkout from './components/Checkout';
import NotFound from './components/NotFound';

const routes = [
  { component: App,
    routes: [
      { path: '/', exact: true, component: Home },
      { path: '/about', component: About },
      { path: '/products', component: Products },
      { path: '/products/*', component: Products },
      { path: '/checkout', component: Checkout },
      { path: '/checkout/*', component: Checkout },
      { path: '*', component: NotFound },
    ],
  },
];

export default routes;
