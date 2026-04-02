import { type Dispatch } from 'redux'
import { fetchTrendingCoins } from '../../utils/api'
import type { TrendingCoin } from '../../models/HomeData'

export const ActionType = {
  RECEIVE_TRENDING: 'RECEIVE_TRENDING'
} as const

export type ReceiveTrendingAction = {
  type: typeof ActionType.RECEIVE_TRENDING;
  payload: {
    trending: TrendingCoin[]
  }
}

export type TrendingAction = ReceiveTrendingAction

function receiveTrendingActionCreator(trending: TrendingCoin[]): ReceiveTrendingAction {
  return {
    type: ActionType.RECEIVE_TRENDING,
    payload: {
      trending
    }
  }
}

function asyncReceiveTrending() {
  return async (dispatch: Dispatch<TrendingAction>) => {
    try {
      const response = await fetchTrendingCoins()
      if (response) {
        dispatch(receiveTrendingActionCreator(response.coins))
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      } else {
        alert('Gagal mengambil data koin trending')
      }
    }
  }
}

export { receiveTrendingActionCreator, asyncReceiveTrending }