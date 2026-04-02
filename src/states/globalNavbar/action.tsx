// states/globalData/action.ts
import { type Dispatch } from 'redux'; // Import Dispatch dari redux
import { fetchGlobalStats } from '../../utils/api'
import type { GlobalData } from '../../models/HomeData'

export const ActionType = {
  RECEIVE_GLOBAL_DATA: 'RECEIVE_GLOBAL_DATA'
} as const;

export type ReceiveGlobalDataAction = {
  type: typeof ActionType.RECEIVE_GLOBAL_DATA
  payload: {
    globalData: GlobalData
  }
}

// Gunakan union type jika ke depannya ada action lain di folder ini
export type GlobalDataAction = ReceiveGlobalDataAction;

function receiveGlobalDataActionCreator(globalData: GlobalData): ReceiveGlobalDataAction {
  return {
    type: ActionType.RECEIVE_GLOBAL_DATA,
    payload: {
      globalData
    }
  }
}

// Perbaikan: Ganti 'any' dengan Dispatch
function asyncReceiveGlobalData() {
  return async (dispatch: Dispatch<GlobalDataAction>) => {
    try {
      const globalData = await fetchGlobalStats()
      if (globalData) {
        dispatch(receiveGlobalDataActionCreator(globalData))
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      } else {
        alert('An unknown error occurred')
      }
    }
  }
}

export { receiveGlobalDataActionCreator, asyncReceiveGlobalData }