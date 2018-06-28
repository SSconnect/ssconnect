// @flow
import type { Action, ID } from '../../types'
import { Actions } from './actionTypes'

export type State = ID[]

export const initialState: State = []

export default function(state: State = initialState, action: Action): State {
  switch (action.type) {
    case Actions.READED_STORY:
      return state

    case Actions.RECEIVE_STORIES:
      return action.stories.map(story => story.id)
    default:
      return state
  }
}
