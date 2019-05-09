import { error as errorReducer } from './errorReducers'
import * as errorSelectors from './errorSelectors'
import { initializeModule } from '../initialize'

export const error = initializeModule(errorReducer, errorSelectors)
