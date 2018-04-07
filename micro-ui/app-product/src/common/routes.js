import App from './components/App';
import Products from './components/Products';

const routes = [
  { component: App,
    routes: [
      { path: '*', component: Products },
    ],
  },
];

export default routes;
