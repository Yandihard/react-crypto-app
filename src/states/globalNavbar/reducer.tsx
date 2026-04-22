// states/globalData/reducer.ts
import { ActionType } from './action'
import type { GlobalData } from '../../models/HomeData'

export type GlobalDataState = {
  data: GlobalData | null
  isLoading: boolean
  error: string | null
}

const initialState: GlobalDataState = {
  data: null,
  isLoading: false,
  error: null
}

function globalDataReducer(
  state: GlobalDataState = initialState,
  action: any
): GlobalDataState {
  switch (action.type) {
    case ActionType.RECEIVE_GLOBAL_DATA:
      return {
        ...state,
        data: action.payload.globalData,
        isLoading: false,
        error: null
      }
    case ActionType.SET_GLOBAL_DATA_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading
      }
    case ActionType.SET_GLOBAL_DATA_ERROR:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false
      }
    default:
      return state
  }
}


export default globalDataReducer