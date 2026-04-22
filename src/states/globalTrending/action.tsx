import { type Dispatch } from 'redux'
import { fetchTrendingCoins } from '../../utils/api'
import type { TrendingCoin } from '../../models/HomeData'

export const ActionType = {
  RECEIVE_TRENDING: 'RECEIVE_TRENDING',
  SET_TRENDING_LOADING: 'SET_TRENDING_LOADING',
  SET_TRENDING_ERROR: 'SET_TRENDING_ERROR'
} as const

export type ReceiveTrendingAction = {
  type: typeof ActionType.RECEIVE_TRENDING;
  payload: {
    trending: TrendingCoin[]
  }
}

export type SetTrendingLoadingAction = {
  type: typeof ActionType.SET_TRENDING_LOADING
  payload: {
    isLoading: boolean
  }
}

export type SetTrendingErrorAction = {
  type: typeof ActionType.SET_TRENDING_ERROR
  payload: {
    error: string | null
  }
}

export type TrendingAction = 
  | ReceiveTrendingAction 
  | SetTrendingLoadingAction 
  | SetTrendingErrorAction

function receiveTrendingActionCreator(trending: TrendingCoin[]): ReceiveTrendingAction {
  return {
    type: ActionType.RECEIVE_TRENDING,
    payload: {
      trending
    }
  }
}

function setTrendingLoadingActionCreator(isLoading: boolean): SetTrendingLoadingAction {
  return {
    type: ActionType.SET_TRENDING_LOADING,
    payload: {
      isLoading
    }
  }
}

function setTrendingErrorActionCreator(error: string | null): SetTrendingErrorAction {
  return {
    type: ActionType.SET_TRENDING_ERROR,
    payload: {
      error
    }
  }
}

function asyncReceiveTrending() {
  return async (dispatch: Dispatch<TrendingAction>) => {
    dispatch(setTrendingLoadingActionCreator(true))
    try {
      const response = await fetchTrendingCoins()
      if (response) {
        dispatch(receiveTrendingActionCreator(response.coins))
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setTrendingErrorActionCreator(error.message))
        alert(error.message)
      } else {
        dispatch(setTrendingErrorActionCreator('Gagal mengambil data koin trending'))
        alert('Gagal mengambil data koin trending')
      }
    } finally {
      dispatch(setTrendingLoadingActionCreator(false))
    }
  }
}

export { 
  receiveTrendingActionCreator, 
  setTrendingLoadingActionCreator, 
  setTrendingErrorActionCreator, 
  asyncReceiveTrending 
}