import React from 'react'
import { connect } from 'react-redux'
import { AlertState, State } from '../../shared/modules/state'
import { getAlert } from '../../shared/modules/alert/alertSelectors'
import { Alert } from 'reactstrap'
import { css } from 'emotion'

const gridStyle = css`
  display: grid;
`

const MainAlertComponent = ({ alert }: { alert: AlertState | null }) => {
  if (!alert) {
    return null
  }
  return (
    <div className={gridStyle}>
      <Alert type={alert.type} message={alert.message} isDismissible={alert.dismissible} />
    </div>
  )
}

export const MainAlert = connect((state: State) => ({
  alert: getAlert(state),
}))(MainAlertComponent)
