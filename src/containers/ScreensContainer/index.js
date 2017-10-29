// @flow
import * as React from 'react'
import { connect, type Connector } from 'react-redux'
import _ from 'lodash'
import FlatButton from 'material-ui/FlatButton'
import FontAwesome from 'react-fontawesome'

import SearchForm from '../SearchFormContainer'
import { deleteSubmit } from './logic'

import type { State, Screen, System } from '../../types'
import LoadingIndicator from '../../components/LoadingIndicator'
import StoryListContainer from '../StoryListContainer'
import AppBar from 'material-ui/AppBar'

import styled from 'styled-components'

type Props = {
  screens: Screen[],
  system: System,
  deleteSubmit: Function,
}

const Fixer = styled.div`
  position: fixed;
  width: 100%;
`

const FixerMargin = styled.div`
  padding: 64px 0 54px;
`

function getTitle(screen: Screen): string {
  if (screen.type === 'new') {
    return '新着'
  } else if (screen.type === 'search') {
    return '検索'
  } else if (screen.type === 'profile') {
    return _.compact([screen.q, screen.tag]).join(' | ')
  }
  return ''
}

class Container extends React.Component<Props> {
  render() {
    const { props } = this
    return (
      <div>
        {props.screens.map(screen =>
          this.renderScreen(screen, props.system.selectedTab === screen.id),
        )}
      </div>
    )
  }

  renderScreen(screen: Screen, display: boolean) {
    return (
      <div
        key={screen.id}
        style={{
          display: display ? 'block' : 'none',
        }}
      >
        <Fixer>
          <AppBar
            showMenuIconButton={false}
            title={getTitle(screen)}
            iconElementRight={
              <FlatButton
                icon={<FontAwesome name="minus" />}
                onClick={() => {
                  this.props.deleteSubmit(screen.id)
                }}
              />
            }
          />
        </Fixer>
        <FixerMargin>{this.renderScreenMain(screen)}</FixerMargin>
      </div>
    )
  }

  renderScreenMain(screen: Screen) {
    if (!screen.loaded) {
      return <LoadingIndicator key={screen.id} />
    }
    if (screen.type === 'search') {
      return (
        <div>
          <SearchForm />
        </div>
      )
    }
    return <StoryListContainer key={screen.id} screen={screen} />
  }
}

const ms = (state: State) => ({
  screens: _.values(state.ScreensContainer),
  system: state.System,
})

const conn: Connector<{}, Props> = connect(ms, { deleteSubmit })

export default conn(Container)
