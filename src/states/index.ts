import { configureStore } from '@reduxjs/toolkit'
import globalDataReducer from './globalNavbar/reducer'
import trendingReducer from './globalTrending/reducer'
import cryptoTableReducer from './cryptoTable/reducer'

const store = configureStore({
  reducer: {
    globalData: globalDataReducer,
    globalTrending: trendingReducer,
    cryptoTable: cryptoTableReducer
  }
})

// 1. RootState: Mengambil tipe data dari semua reducer otomatis
export type RootState = ReturnType<typeof store.getState>

// 2. AppDispatch: Mengambil tipe fungsi dispatch agar thunk tidak error "any"
export type AppDispatch = typeof store.dispatch

export default store