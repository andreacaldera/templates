import { Home } from '../client/containers/Home'
import { Account } from '../client/containers/Account'
import { App } from '../client/App'
import { ErrorPage } from '../client/containers/ErrorPage'

export const routes = [
  {
    component: App,
    routes: [
      { path: '/app', exact: true, component: Home },
      { path: '/app/:accountId', component: Account },
      { path: '/error', component: ErrorPage }, // TODO path should be a catch all if everything else fails
    ],
  },
]
