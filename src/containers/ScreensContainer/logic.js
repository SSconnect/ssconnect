// @flow
import type { ThunkAction, Screen, Article, Story } from '../../types'
import _ from 'lodash'
import moment from 'moment'

import * as client from '../../api/client'
import { receiveStories, readedStory } from '../StoriesContainer/actions'
import { receiveBlogs } from '../BlogsContainer/actions'
import { switchTab } from '../System/actions'
import { receiveArticles } from '../ArticlesContainer/actions'
import * as actions from './actions'
import { toId } from '../../utils'

export function loadScreenStoryAll(): ThunkAction {
  return (dispatch, getState) => {
    _.each(getState().ScreensContainer, screen => {
      dispatch(loadScreenStory(screen))
    })
  }
}

export function loadScreenStory(screen: Screen): ThunkAction {
  return async (dispatch, getState) => {
    const res = await client.getStories(screen).catch(err => {
      console.log(err)
      return false
    })
    if (res === false) {
      console.log('load error')
      return
    }
    const { stories, blogs, articles, pageInfo } = res
    dispatch(receiveStories(stories))
    dispatch(receiveArticles(articles))
    dispatch(receiveBlogs(blogs))

    const storyIds = stories
      .sort(
        (a, b) =>
          moment(a.firstPostedAt).isBefore(moment(b.firstPostedAt)) ? 1 : -1,
      )
      .map(story => story.id)

    const key = toId(screen)
    const prev = getState().ScreensContainer[key] || { pages: [] }
    const screenStore = {
      pages: {
        ...prev.pages,
        [pageInfo.page]: storyIds,
      },
      total: pageInfo.total,
    }
    dispatch(actions.saveScreen(key, screenStore))
  }
}

export function searchSubmit(q: string, tag: string): ThunkAction {
  return async (dispatch, getState) => {
    // await dispatch(actions.makeScreenProfile(q, tag))
    // const screen = selectors.getNewScreen(getState())
    // dispatch(switchTab(screen.id))
    // dispatch(loadScreenStory(screen))
  }
}

export function deleteSubmit(screenId: number): ThunkAction {
  return async (dispatch, getState) => {
    await dispatch(switchTab(screenId - 1))
    // await dispatch(actions.deleteScreenProfile(screenId))
  }
}

export function openedArticle(article: Article, story: Story): ThunkAction {
  return dispatch => {
    dispatch(readedStory(story.id))
  }
}
