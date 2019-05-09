import actionCreatorFactory from 'typescript-fsa'
import { AlertState } from '../state'

const createAction = actionCreatorFactory()

export const createAlert = createAction<AlertState>('CREATE_ALERT')
