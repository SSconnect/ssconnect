// @flow

import { create } from 'apisauce'
import camelcaseKeys from 'camelcase-keys'
import _ from 'lodash'
import { normalizeStories } from './normalize'

import type {
  Story,
  Blog,
  QueryParams,
  PageInfo,
  Screen,
  Article,
} from '../types'

const host =
  process.env.NODE_ENV == 'development'
    ? // ? 'http://localhost:3001'
      'https://ssconnect.elzup.com'
    : 'https://ssconnect.elzup.com'
const TIMEOUT = 1000

const api = create({
  baseURL: host,
  timeout: TIMEOUT,
})

function permitQuery(screen: Screen): QueryParams {
  switch (screen.type) {
    case 'new': {
      const { page } = screen
      return { page, tag: '', q: '' }
    }
    case 'search': {
      const { page, tag, q } = screen
      return { page, tag, q }
    }
    default: {
      // NOTE: Why can remove?
      return { page: 0, tag: '', q: '' }
    }
  }
}

type GetStoriesCallback = ({
  stories: Story[],
  articles: Article[],
  blogs: Blog[],
  pageInfo: PageInfo,
}) => void

export async function getStories(
  screen: Screen,
  timeout: number = TIMEOUT,
): Promise<GetStoriesCallback> {
  const params = permitQuery(screen)
  const res = await api.get('/v1/stories', params)
  // { stories: res.data, pageInfo: FeedClient.getPageInfo(res) }
  const normalizedData = normalizeStories(res.data)
  const camelizedData = camelcaseKeys(normalizedData, { deep: true })
  const pageInfo = getPageInfo(res)
  return { ..._.mapValues(camelizedData.entities, _.values), pageInfo }
}

function getPageInfo(res: any): PageInfo {
  return {
    page: parseInt(res.headers['x-page'], 10),
    total: parseInt(res.headers['x-total-pages'], 10),
    next: parseInt(res.headers['x-next-page'], 10) || false,
    prev: parseInt(res.headers['x-prev-page'], 10) || false,
  }
}
