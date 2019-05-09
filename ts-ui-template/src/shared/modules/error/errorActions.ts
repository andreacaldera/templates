import actionCreatorFactory from 'typescript-fsa'
import { ApplicationError } from '../state'

const createAction = actionCreatorFactory()

export const GENERAL_ERROR = {
  title: 'Sorry, we are experiencing an internal server error',
  message: `It’s not you, it’s us. We are working to get the problem fixed.`
}

export const createApplicationError = createAction<ApplicationError>('APPLICATION_ERROR')
