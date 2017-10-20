// @flow
import { REHYDRATE } from 'redux-persist/constants'

import type { Action, System } from '../../types'
import { Actions } from './actionTypes'

export type State = System

export const initialState: State = {
  selectedTab: 1,
}

export default function(state: State = initialState, action: Action): State {
  switch (action.type) {
    case Actions.SWITCH_TAB:
      return {
        ...state,
        selectedTab: action.target,
      }

    case REHYDRATE:
      return action.payload.System

    default:
      return state
  }
}