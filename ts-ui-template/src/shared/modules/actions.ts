import actionCreatorFactory from 'typescript-fsa'

const createAction = actionCreatorFactory()

export const changeUrl = createAction<string>('CHANGE_URL')
export const urlChanged = createAction('URL_CHANGED')

export const isError = (payload: any): payload is Error => payload instanceof Error
