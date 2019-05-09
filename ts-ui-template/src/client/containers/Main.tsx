import React, { ReactNode } from 'react'
import { connect } from 'react-redux'
import { getError } from '../../shared/modules/error/errorSelectors'
import { State, ApplicationError } from '../../shared/modules/state'

type MainProps = {
  children?: ReactNode
  error: ApplicationError | null
}

const MainComponent = ({ children, error }: MainProps) => <>{children}</>

const mapStateToProps = (state: State) => ({
  error: getError(state),
})

export const Main = connect(mapStateToProps)(MainComponent)
