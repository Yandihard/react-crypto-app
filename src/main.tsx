import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/style.css'
import { Provider } from 'react-redux'
import store from './states/index.ts'
import HomePage from './pages/HomePage.tsx'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <HomePage />
    </StrictMode>
  </Provider>
)
