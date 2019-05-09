import rootReducer from './reducers'
import * as selectors from './selectors'
import { initializeModule } from './initialize'

export const reducer = initializeModule(rootReducer, selectors, {})
