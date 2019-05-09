import { Reducer } from 'redux'
import { Action } from 'typescript-fsa'

export function initializeModule(
  reducer: Reducer<any, Action<any>>,
  selectors: any,
  constants = {}
) {
  const moduleProps = Object.assign({}, selectors, constants)
  Object.entries(moduleProps).forEach(([propName, prop]) => {
    ;(reducer as any)[propName] = prop
  })
  return reducer
}
