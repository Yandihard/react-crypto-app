// states/globalData/reducer.ts
import { ActionType, type GlobalDataAction } from './action'
import type { GlobalData } from '../../models/HomeData'

// Perbaikan: Gunakan GlobalDataAction sebagai tipe action
function globalDataReducer(
  globalData: GlobalData | null = null,
  action: GlobalDataAction | { type: string; payload?: unknown } = { type: '' }
): GlobalData | null {
  switch (action.type) {
    case ActionType.RECEIVE_GLOBAL_DATA:
      // TypeScript sekarang tahu action ini punya payload.globalData
      return (action as GlobalDataAction).payload.globalData
    default:
      return globalData
  }
}

export default globalDataReducer