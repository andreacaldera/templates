import * as instagramSelectors from './instagramSelectors'
import { initializeModule } from '../initialize'
import { instagramReducers } from './instagramReducers'

export const instagram = initializeModule(instagramReducers, instagramSelectors)
