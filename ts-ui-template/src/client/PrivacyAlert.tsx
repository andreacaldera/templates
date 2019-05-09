import React, { memo } from 'react'
import { isPrivacyAccepted } from '../shared/modules/meta/metaSelectors'
import { connect } from 'react-redux'
import { State } from '../shared/modules/state'
import Button from 'reactstrap/lib/Button'
import * as metaActions from '../shared/modules/meta/metaActions'
import { css } from 'emotion'

const style = css`
  background: lightgray;
  font-size: 12px;
  position: fixed;
  bottom: 0;
  padding: 10px;
  width: 100%;
  text-align: center;
`

const buttonStyle = css`
  margin-left: 10px;
`

type PrivacyAlertProps = {
  privacyAccepted: boolean
  acceptPrivacy: () => void
}

const Component = ({ privacyAccepted, acceptPrivacy }: PrivacyAlertProps) => {
  if (privacyAccepted) {
    return null
  }

  return (
    <div className={style}>
      This site uses cookies. We may also retain some of your public Instagram data (nothing more
      than what's already publicly available on your Instagram page). This is only done to be able
      to provide you with the best possible experience and will never share any of your data with
      any third-party. No matter what! You can write to us any time and we will prompty delete all
      your information. If you wish to know more, please contact us!
      <Button className={buttonStyle} onClick={acceptPrivacy}>
        Got it!
      </Button>
    </div>
  )
}

const OptimisedComponent = memo(Component)

const mapStateToProps = (state: State) => ({
  privacyAccepted: isPrivacyAccepted(state),
})

export const PrivacyAlert = connect(
  mapStateToProps,
  {
    acceptPrivacy: metaActions.acceptPrivacy,
  },
)(OptimisedComponent)
