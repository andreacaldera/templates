import actionCreatorFactory from 'typescript-fsa'
import { Instagram, Token } from '../state'

const createAction = actionCreatorFactory()

export const loadAccountAction = createAction<string>('LOAD_ACCOUNT')
export const accountLoadedAction = createAction<Instagram>('ACCOUNT_LOADED')

export const saveTokenAction = createAction<Token>('SAVE_TOKEN')
