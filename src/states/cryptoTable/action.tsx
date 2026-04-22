import type { AppDispatch } from '..'
import { fetchCoinsMarkets } from '../../utils/api'
import type { MarketCoin } from '../../models/HomeData'

const ActionType = {
  RECEIVE_MARKETS_DATA: 'RECEIVE_MARKETS_DATA',
  SET_MARKETS_LOADING: 'SET_MARKETS_LOADING',
  SET_MARKETS_ERROR: 'SET_MARKETS_ERROR',
}

function receiveMarketsDataActionCreator(data: MarketCoin[]) {
  return {
    type: ActionType.RECEIVE_MARKETS_DATA,
    payload: { data },
  }
}

function setMarketsLoadingActionCreator(isLoading: boolean) {
  return {
    type: ActionType.SET_MARKETS_LOADING,
    payload: { isLoading },
  }
}

function setMarketsErrorActionCreator(error: string | null) {
  return {
    type: ActionType.SET_MARKETS_ERROR,
    payload: { error },
  }
}

function asyncReceiveMarketsData(page: number = 1) {
  return async (dispatch: AppDispatch) => {
    dispatch(setMarketsLoadingActionCreator(true))
    dispatch(setMarketsErrorActionCreator(null))
    
    try {
      const data = await fetchCoinsMarkets(page)
      if (data) {
        dispatch(receiveMarketsDataActionCreator(data))
      } else {
        dispatch(setMarketsErrorActionCreator('Gagal mengambil data pasar kripto'))
      }
    } catch (error: any) {
      dispatch(setMarketsErrorActionCreator(error.message))
    } finally {
      dispatch(setMarketsLoadingActionCreator(false))
    }
  }
}


export {
  ActionType,
  receiveMarketsDataActionCreator,
  setMarketsLoadingActionCreator,
  setMarketsErrorActionCreator,
  asyncReceiveMarketsData,
}
