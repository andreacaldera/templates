import { alert as alertReducer } from './alertReducers'
import * as alertSelectors from './alertSelectors'
import { initializeModule } from '../initialize'

export const alert = initializeModule(alertReducer, alertSelectors)
