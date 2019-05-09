import { createSelector } from 'reselect'
import { getRootSelector } from '../selectors'
import { INITIAL_INSTAGRAM } from '../state'

export const getInstagram = createSelector(
  getRootSelector,
  ({ instagram }) => {
    // TODO FIX! Somehow instagram property gets wrapped into another instagram { instagram: {}}
    // Couldn't find what the issue is!
    // return (instagram as any).instagram
    return instagram || INITIAL_INSTAGRAM
  },
)

export const getPosts = createSelector(
  getInstagram,
  ({ posts = [] }) => posts,
)
