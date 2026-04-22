import { useState, useEffect } from 'react'
import { type GlobalData } from '../models/HomeData'
import { formatNumberWithCommas, formatDecimal, formatCurrencyCompact } from '../utils/formatter'

interface NavbarProps {
  stats: GlobalData | null
  isLoading: boolean
}

const Navbar: React.FC<NavbarProps> = ({ stats, isLoading }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // 1. Inisialisasi state berdasarkan preferensi sistem atau localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') || 
             localStorage.getItem('theme') === 'dark'
    }
    return false
  })

  // 2. Gunakan useEffect untuk update class di <html> setiap kali state berubah
  useEffect(() => {
    const html = document.documentElement
    if (isDarkMode) {
      html.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      html.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  };

  return (
    <>
      {/* GLOBAL STATS BAR */}
      <div
        className="bg-gray-50 border-b border-gray-200 py-1.5 px-4 text-[11px] sm:text-xs text-gray-600"
        data-purpose="global-market-stats"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap gap-x-4 gap-y-1 items-center">
          {isLoading || !stats ? (
            <div className="flex gap-4 animate-pulse py-1">
              <div className="h-3 w-16 bg-gray-200 rounded"></div>
              <div className="h-3 w-20 bg-gray-200 rounded"></div>
              <div className="h-3 w-32 bg-gray-200 rounded"></div>
              <div className="h-3 w-24 bg-gray-200 rounded"></div>
              <div className="h-3 w-40 bg-gray-200 rounded"></div>
            </div>
          ) : (
            <>
              <span>Coins: <span className="text-blue-600 font-medium">{formatNumberWithCommas(stats.data.active_cryptocurrencies)}</span></span>
              <span>Exchanges: <span className="text-blue-600 font-medium">{formatNumberWithCommas(stats.data.markets)}</span></span>
              <span>
                Market Cap: <span className="text-blue-600 font-medium">{formatCurrencyCompact(stats.data.total_market_cap.usd)}</span>
                <span className="text-emerald-500 ml-1">▲ {formatNumberWithCommas(stats.data.market_cap_change_percentage_24h_usd)}%</span>
              </span>
              <span>24h Vol: <span className="text-blue-600 font-medium">{formatCurrencyCompact(stats.data.total_volume.usd)}</span></span>
              <span>
                Dominance: <span className="text-gray-900 font-medium">BTC {formatDecimal(stats.data.market_cap_percentage.btc)}% ETH {formatDecimal(stats.data.market_cap_percentage.eth)}%</span>
              </span>
              <span className="ml-auto hidden md:inline">
                Gas: <span className="text-blue-600 font-medium">24 GWEI</span>
              </span>
            </>
          )}
        </div>
      </div>


      {/* MAIN HEADER */}
      <header
        className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm"
        data-purpose="main-navigation"
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-lg cursor-pointer"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M4 6h16M4 12h16m-7 6h7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>

          {/* Logo & Main Nav */}
          <div className="flex items-center space-x-8">
            <a className="flex items-center space-x-2" href="#">
              <div className="w-8 h-8 bg-gradient-to-tr from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl italic">
                A
              </div>
              <span className="text-xl font-bold tracking-tight">Angelz28</span>
            </a>
            
            <nav className="hidden lg:flex items-center space-x-6 text-sm font-semibold text-gray-700">
              <a className="hover:text-emerald-600 transition" href="#">Cryptocurrencies</a>
              <a className="hover:text-emerald-600 transition" href="#">Exchanges</a>
              <a className="hover:text-emerald-600 transition" href="#">NFT</a>
              <a className="hover:text-emerald-600 transition" href="#">Learn</a>
              <a className="hover:text-emerald-600 transition" href="#">Products</a>
            </nav>
          </div>

          {/* Search and User Actions */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <input
                className="w-48 lg:w-64 bg-gray-100 border-none rounded-full py-1.5 pl-9 pr-4 text-sm focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                placeholder="Search..."
                type="text"
              />
              <svg
                className="w-4 h-4 text-gray-400 absolute left-3 top-2.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </div>
            
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>

            {/* Tombol Dark Mode */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Dark Mode"
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors dark:text-gray-400 dark:hover:bg-gray-800"
            >
              <span className="material-symbols-outlined text-[20px]">
                {isDarkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU DRAWER */}
      <div
        className={`fixed inset-0 z-[60] transform ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 lg:hidden`}
      >
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black/50"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
        
        {/* Sidebar */}
        <nav className="relative w-64 h-full bg-white dark:bg-gray-900 shadow-xl flex flex-col p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl font-bold tracking-tight dark:text-white">Menu</span>
            <button
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M6 18L18 6M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
          
          <a className="text-lg font-semibold text-gray-700 dark:text-gray-200 hover:text-emerald-600 transition" href="#">Cryptocurrencies</a>
          <a className="text-lg font-semibold text-gray-700 dark:text-gray-200 hover:text-emerald-600 transition" href="#">Exchanges</a>
          <a className="text-lg font-semibold text-gray-700 dark:text-gray-200 hover:text-emerald-600 transition" href="#">NFT</a>
          <a className="text-lg font-semibold text-gray-700 dark:text-gray-200 hover:text-emerald-600 transition" href="#">Learn</a>
          <a className="text-lg font-semibold text-gray-700 dark:text-gray-200 hover:text-emerald-600 transition" href="#">Products</a>
          
          <hr className="border-gray-100 dark:border-gray-800 my-2" />
          
          <div className="pt-4">
            <p className="text-xs text-gray-400 uppercase font-bold mb-4">Account</p>
            <a className="flex items-center space-x-3 text-gray-700 dark:text-gray-200" href="#">
              <span className="material-symbols-outlined">person</span>
              <span className="font-medium">Profile</span>
            </a>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Navbar