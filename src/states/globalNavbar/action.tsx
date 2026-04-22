// states/globalData/action.ts
import { type Dispatch } from 'redux'; // Import Dispatch dari redux
import { fetchGlobalStats } from '../../utils/api'
import type { GlobalData } from '../../models/HomeData'

export const ActionType = {
  RECEIVE_GLOBAL_DATA: 'RECEIVE_GLOBAL_DATA',
  SET_GLOBAL_DATA_LOADING: 'SET_GLOBAL_DATA_LOADING',
  SET_GLOBAL_DATA_ERROR: 'SET_GLOBAL_DATA_ERROR'
} as const;

export type ReceiveGlobalDataAction = {
  type: typeof ActionType.RECEIVE_GLOBAL_DATA
  payload: {
    globalData: GlobalData
  }
}

export type SetGlobalDataLoadingAction = {
  type: typeof ActionType.SET_GLOBAL_DATA_LOADING
  payload: {
    isLoading: boolean
  }
}

export type SetGlobalDataErrorAction = {
  type: typeof ActionType.SET_GLOBAL_DATA_ERROR
  payload: {
    error: string | null
  }
}

export type GlobalDataAction = 
  | ReceiveGlobalDataAction 
  | SetGlobalDataLoadingAction 
  | SetGlobalDataErrorAction;

function receiveGlobalDataActionCreator(globalData: GlobalData): ReceiveGlobalDataAction {
  return {
    type: ActionType.RECEIVE_GLOBAL_DATA,
    payload: {
      globalData
    }
  }
}

function setGlobalDataLoadingActionCreator(isLoading: boolean): SetGlobalDataLoadingAction {
  return {
    type: ActionType.SET_GLOBAL_DATA_LOADING,
    payload: {
      isLoading
    }
  }
}

function setGlobalDataErrorActionCreator(error: string | null): SetGlobalDataErrorAction {
  return {
    type: ActionType.SET_GLOBAL_DATA_ERROR,
    payload: {
      error
    }
  }
}

function asyncReceiveGlobalData() {
  return async (dispatch: Dispatch<GlobalDataAction>) => {
    dispatch(setGlobalDataLoadingActionCreator(true))
    try {
      const globalData = await fetchGlobalStats()
      if (globalData) {
        dispatch(receiveGlobalDataActionCreator(globalData))
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setGlobalDataErrorActionCreator(error.message))
        alert(error.message)
      } else {
        dispatch(setGlobalDataErrorActionCreator('An unknown error occurred'))
        alert('An unknown error occurred')
      }
    } finally {
      dispatch(setGlobalDataLoadingActionCreator(false))
    }
  }
}

export { 
  receiveGlobalDataActionCreator, 
  setGlobalDataLoadingActionCreator, 
  setGlobalDataErrorActionCreator, 
  asyncReceiveGlobalData 
}