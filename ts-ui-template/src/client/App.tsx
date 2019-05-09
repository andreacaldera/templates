import React from 'react'
import { renderRoutes } from 'react-router-config'
import { connect } from 'react-redux'
import { getConfig, isLoading, isPrivacyAccepted } from '../shared/modules/meta/metaSelectors'
import { State, Config } from '../shared/modules/state'
import { css } from 'emotion'
import { PrivacyAlert } from './PrivacyAlert'

import 'bootstrap/dist/css/bootstrap.css'

export type AppProps = Readonly<{
  config: Config
  route: any
  isLoading: boolean
}>

// TODO move loading stuff to its own component
const isLoadingStyle = css`
  opacity: 0.1;
`

const spinningStyle = css`
  position: fixed;
  bottom: 50%;
  right: 50%;
  z-index: 1050;

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  &:before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 15%;
    width: 20px;
    height: 20px;
    margin-top: -10px;
    margin-left: -10px;
    border-radius: 50%;
    border-top: 2px solid #07d;
    border-right: 2px solid transparent;
    animation: spinner 0.6s linear infinite;
  }
`

const loadingStyle = css`
  z-index: 10000000;
  width: 100vw;
  height: 100vh;
  color: transparent;
  position: absolute;
`

const AppComponent = (props: AppProps) => {
  return (
    <>
      {props.isLoading && (
        <div className={loadingStyle}>
          <div className={spinningStyle} />
        </div>
      )}
      <div className={props.isLoading ? isLoadingStyle : ''}>
        {renderRoutes(props.route.routes)}
      </div>
      <PrivacyAlert />
    </>
  )
}

const mapStateToProps = (state: State) => ({
  config: getConfig(state),
  isLoading: isLoading(state),
  privacyAccepted: isPrivacyAccepted(state),
})

export const App = connect(
  mapStateToProps,
  null,
)(AppComponent)
