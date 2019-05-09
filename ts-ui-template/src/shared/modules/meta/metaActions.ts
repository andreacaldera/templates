import actionCreatorFactory from 'typescript-fsa'

const createAction = actionCreatorFactory()

export const loading = createAction<boolean>('LOADING')

export const acceptPrivacy = createAction('ACCEPT_PRIVACY')

export const privacyAccepted = createAction<boolean>('PRIVACY_ACCEPTED')

export const setSellerDemo = createAction<boolean>('SET_SELLER_DEMO')
