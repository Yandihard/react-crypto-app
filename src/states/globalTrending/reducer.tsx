import { ActionType } from './action'
import type { TrendingCoin } from '../../models/HomeData'

export type TrendingState = {
  data: TrendingCoin[]
  isLoading: boolean
  error: string | null
}

const initialState: TrendingState = {
  data: [],
  isLoading: false,
  error: null
}

function trendingReducer(
  state: TrendingState = initialState,
  action: any
): TrendingState {
  switch (action.type) {
    case ActionType.RECEIVE_TRENDING:
      return {
        ...state,
        data: action.payload.trending,
        isLoading: false,
        error: null
      }
    case ActionType.SET_TRENDING_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading
      }
    case ActionType.SET_TRENDING_ERROR:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false
      }
    default:
      return state
  }
}


export default trendingReducer