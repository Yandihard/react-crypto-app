import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../states'
import { asyncReceiveMarketsData } from '../states/cryptoTable/action'

const CryptoTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { data: coins, isLoading } = useSelector((state: RootState) => state.cryptoTable)
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (page: number) => {
    if (page < 1) return
    setCurrentPage(page)
    dispatch(asyncReceiveMarketsData(page))
    // Scroll ke atas tabel saat pindah halaman
    const tableElement = document.getElementById('crypto-price-table')
    if (tableElement) {
      tableElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: val < 1 ? 6 : 2,
    }).format(val)
  }

  const formatCompact = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(val)
  }

  const generateSparklinePath = (prices: number[]) => {
    if (!prices || prices.length === 0) return ''
    const min = Math.min(...prices)
    const max = Math.max(...prices)
    const range = max - min || 1
    const width = 100
    const height = 30
    const points = prices.map((p, i) => {
      const x = (i / (prices.length - 1)) * width
      const y = (height + 5) - ((p - min) / range) * height
      return `${x.toFixed(2)},${y.toFixed(2)}`
    })
    return `M ${points.join(' L ')}`
  }

  const renderSkeleton = () => {
    return Array.from({ length: 10 }).map((_, idx) => (
      <tr key={`skeleton-${idx}`} className="animate-pulse">
        <td className="px-4 py-5"><div className="h-4 w-4 bg-gray-200 rounded"></div></td>
        <td className="px-4 py-5">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gray-200"></div>
            <div className="space-y-2">
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
              <div className="h-3 w-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </td>
        <td className="px-4 py-5 text-right"><div className="h-4 w-16 bg-gray-200 rounded ml-auto"></div></td>
        <td className="px-4 py-5 text-right"><div className="h-4 w-12 bg-gray-200 rounded ml-auto"></div></td>
        <td className="px-4 py-5 text-right"><div className="h-4 w-12 bg-gray-200 rounded ml-auto"></div></td>
        <td className="px-4 py-5 text-right"><div className="h-4 w-12 bg-gray-200 rounded ml-auto"></div></td>
        <td className="px-4 py-5 text-right"><div className="h-4 w-24 bg-gray-200 rounded ml-auto"></div></td>
        <td className="px-4 py-5 text-right"><div className="h-4 w-24 bg-gray-200 rounded ml-auto"></div></td>
        <td className="px-4 py-5"><div className="h-10 w-32 bg-gray-200 rounded mx-auto"></div></td>
      </tr>
    ))
  }

  return (
    <>
      <section className="flex flex-wrap items-center justify-between gap-4 mb-6" data-purpose="table-filters">
        <div className="flex flex-wrap gap-2">
          {['All', 'Highlights', 'Base Ecosystem', 'Artificial Intelligence (AI)', 'Intent'].map((tab, idx) => (
            <button
              key={tab}
              className={`px-4 py-1.5 rounded-lg text-sm transition ${idx === 0 ? 'bg-emerald-100 text-emerald-700 font-bold' : 'hover:bg-gray-100 text-gray-600 font-semibold'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button className="flex items-center space-x-2 text-sm font-semibold text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
          <span>Customize</span>
        </button>
      </section>

      <div id="crypto-price-table" className="table-container overflow-x-auto border border-gray-200 rounded-xl" data-purpose="crypto-price-table">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider">
            <tr>
              <th className="px-4 py-4 text-left w-12 text-[11px]">#</th>
              <th className="px-4 py-4 text-left text-[11px]">Coin</th>
              <th className="px-4 py-4 text-right text-[11px]">Price</th>
              <th className="px-4 py-4 text-right text-[11px]">1h</th>
              <th className="px-4 py-4 text-right text-[11px]">24h</th>
              <th className="px-4 py-4 text-right text-[11px]">7d</th>
              <th className="px-4 py-4 text-right text-[11px]">24h Volume</th>
              <th className="px-4 py-4 text-right text-[11px]">Mkt Cap</th>
              <th className="px-4 py-4 text-center text-[11px] w-40">Last 7 Days</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100 font-medium text-gray-900">
            {isLoading ? renderSkeleton() : coins.map((coin) => (
              <tr key={coin.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-5 text-gray-400">{coin.market_cap_rank}</td>
                <td className="px-4 py-5">
                  <div className="flex items-center space-x-3">
                    <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full shadow-sm" />
                    <div>
                      <span className="block font-bold truncate max-w-[120px]">{coin.name}</span>
                      <span className="text-xs text-gray-500 uppercase">{coin.symbol}</span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-5 text-right font-bold">{formatCurrency(coin.current_price)}</td>
                <td className={`px-4 py-5 text-right ${coin.price_change_percentage_1h_in_currency >= 0 ? 'text-up' : 'text-down'}`}>
                  {coin.price_change_percentage_1h_in_currency?.toFixed(1)}%
                </td>
                <td className={`px-4 py-5 text-right ${coin.price_change_percentage_24h_in_currency >= 0 ? 'text-up' : 'text-down'}`}>
                  {coin.price_change_percentage_24h_in_currency?.toFixed(1)}%
                </td>
                <td className={`px-4 py-5 text-right ${coin.price_change_percentage_7d_in_currency >= 0 ? 'text-up' : 'text-down'}`}>
                  {coin.price_change_percentage_7d_in_currency?.toFixed(1)}%
                </td>
                <td className="px-4 py-5 text-right">{formatCompact(coin.total_volume)}</td>
                <td className="px-4 py-5 text-right">{formatCompact(coin.market_cap)}</td>
                <td className="px-4 py-5">
                  <svg
                    className={`w-32 h-10 mx-auto ${coin.price_change_percentage_7d_in_currency >= 0 ? 'text-up' : 'text-down'}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 100 40"
                  >
                    <path d={generateSparklinePath(coin.sparkline_in_7d.price)} />
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
        <p>Showing {coins.length} cryptocurrencies</p>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <button
            disabled={currentPage === 1 || isLoading}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {[currentPage, currentPage + 1, currentPage + 2].map(p => (
            <button
              key={p}
              onClick={() => handlePageChange(p)}
              className={`px-3 py-1 border rounded font-bold ${currentPage === p ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'border-gray-200 hover:bg-gray-50'}`}
            >
              {p}
            </button>
          ))}
          <span className="px-2">...</span>
          <button
            disabled={isLoading}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  )
}

export default CryptoTable

