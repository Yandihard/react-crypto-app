import Navbar from '../components/Navbar'
import HeroCards from '../components/HeroCards'
import CryptoTable from '../components/CryptoTable'
import Footer from '../components/Footer'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../states/index'
import { asyncReceiveGlobalData } from '../states/globalNavbar/action'
import { asyncReceiveTrending } from '../states/globalTrending/action'

function HomePage() {
  const dispatch = useDispatch<AppDispatch>()
  const globalData = useSelector((state: RootState) => state.globalData)
  const globalTrending = useSelector((state: RootState) => state.globalTrending)

  useEffect(() => {
  dispatch(asyncReceiveTrending());
}, [dispatch])

  useEffect(() => {
    dispatch(asyncReceiveGlobalData())
  }, [dispatch])

  if (!globalData) return null

  return (
    <>
      <Navbar stats={globalData}/>
          <main className="max-w-7xl mx-auto px-4 py-8">
            <HeroCards data={globalTrending}/>
            <CryptoTable />
          </main>
      <Footer />
    </>
  )
}

export default HomePage
