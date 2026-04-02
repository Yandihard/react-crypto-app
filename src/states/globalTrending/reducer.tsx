import { ActionType, type TrendingAction } from './action'
import type { TrendingCoin } from '../../models/HomeData'

function trendingReducer(
  trending: TrendingCoin[] = [],
  action: TrendingAction | { type: string; payload?: unknown } = { type: '' }
): TrendingCoin[] {
  switch (action.type) {
    case ActionType.RECEIVE_TRENDING:
      return (action as TrendingAction).payload.trending
    default:
      return trending
  }
}

export default trendingReducer