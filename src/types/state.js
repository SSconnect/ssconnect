// @flow
import type { State as ArticleById } from '../containers/ArticleById/reducer'
import type { State as ArticlesContainer } from '../containers/ArticlesContainer/reducer'
import type { State as BlogById } from '../containers/BlogById/reducer'
import type { State as BlogsContainer } from '../containers/BlogsContainer/reducer'
import type { State as ScreensContainer } from '../containers/ScreensContainer/reducer'
import type { State as StoriesContainer } from '../containers/StoriesContainer/reducer'
import type { State as StoryById } from '../containers/StoryById/reducer'
import type { State as System } from '../containers/System/reducer'

export type State = {
  ArticleById: ArticleById,
  ArticlesContainer: ArticlesContainer,
  BlogById: BlogById,
  BlogsContainer: BlogsContainer,
  ScreensContainer: ScreensContainer,
  StoriesContainer: StoriesContainer,
  StoryById: StoryById,
  System: System,
}
