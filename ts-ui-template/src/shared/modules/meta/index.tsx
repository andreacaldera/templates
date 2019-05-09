import { metaReducer } from './metaReducers'
import * as selectors from './metaSelectors'
import { initializeModule } from '../initialize'

export const meta = initializeModule(metaReducer, selectors)
