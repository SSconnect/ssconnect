// @flow

import * as React from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import { getTitle } from '../../utils'
import type { Screen } from '../../types'

type Props = {
  screen: Screen,
  deleteSubmit: Function,
}

const Component = (props: Props) => {
  const { screen, deleteSubmit } = props
  const renderLeftIcon = () => {
    if (screen.type !== 'profile') {
      return null
    }
    return (
      <FlatButton
        icon={
          <FontIcon className="material-icons">{`indeterminate_check_box`}</FontIcon>
        }
        onClick={() => {
          deleteSubmit(screen.id)
        }}
      />
    )
  }

  return (
    <AppBar
      showMenuIconButton={false}
      title={getTitle(screen)}
      iconElementRight={renderLeftIcon()}
      style={{ textAlign: 'center' }}
      iconElementLeft={<span />}
    />
  )
}

export default Component
