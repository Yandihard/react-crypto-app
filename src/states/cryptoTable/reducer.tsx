import { ActionType } from './action'
import type { MarketCoin } from '../../models/HomeData'

interface CryptoTableState {
  data: MarketCoin[]
  isLoading: boolean
  error: string | null
}

const initialState: CryptoTableState = {
  data: [],
  isLoading: false,
  error: null,
}

function cryptoTableReducer(state = initialState, action: any = {}): CryptoTableState {
  switch (action.type) {
    case ActionType.RECEIVE_MARKETS_DATA:
      return {
        ...state,
        data: action.payload.data,
      }
    case ActionType.SET_MARKETS_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      }
    case ActionType.SET_MARKETS_ERROR:
      return {
        ...state,
        error: action.payload.error,
      }
    default:
      return state
  }
}

export default cryptoTableReducer
