import { Home } from '../client/containers/Home'
import { App } from '../client/App'
import { ErrorPage } from '../client/containers/ErrorPage'

export const routes = [
  {
    component: App,
    routes: [
      { path: '/app', exact: true, component: Home },
      { path: '/error', component: ErrorPage }, // TODO path should be a catch all if everything else fails
    ],
  },
]
