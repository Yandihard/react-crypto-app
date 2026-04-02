import React from 'react'

interface CryptoCoin {
  id: number
  name: string
  symbol: string
  price: string
  h1: string
  h24: string
  d7: string
  h24Volume: string
  marketCap: string
  trend: 'up' | 'down' | 'neutral'
  icon: string
  iconBg: string
  iconColor: string
  hasBuyButton?: boolean
  sparklinePath: string
}

const CryptoTable: React.FC = () => {
  const coins: CryptoCoin[] = [
    {
      id: 1, name: 'Bitcoin', symbol: 'BTC', price: '$71,490.26', h1: '0.0%', h24: '1.3%', d7: '6.3%', 
      h24Volume: '$22,650,875,015', marketCap: '$1,430,469,712,464', trend: 'up', 
      icon: '₿', iconBg: 'bg-orange-100', iconColor: 'text-orange-600', hasBuyButton: true,
      sparklinePath: 'M0 30 L10 32 L20 25 L30 20 L40 25 L50 15 L60 18 L70 5 L80 12 L90 8 L100 2'
    },
    {
      id: 2, name: 'Ethereum', symbol: 'ETH', price: '$3,493.70', h1: '0.1%', h24: '1.0%', d7: '7.7%', 
      h24Volume: '$9,209,357,704', marketCap: '$452,783,441,593', trend: 'up', 
      icon: 'Ξ', iconBg: 'bg-blue-100', iconColor: 'text-blue-600', hasBuyButton: true,
      sparklinePath: 'M0 35 L15 30 L30 38 L45 20 L60 25 L75 10 L90 5 L100 8'
    },
    {
      id: 3, name: 'Tether', symbol: 'USDT', price: '$1.00', h1: '0.0%', h24: '0.0%', d7: '0.0%', 
      h24Volume: '$37,789,671,272', marketCap: '$184,077,209,875', trend: 'neutral', 
      icon: '₮', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600',
      sparklinePath: 'M0 20 L10 19 L20 21 L30 20 L40 19 L50 20 L60 21 L70 20 L80 19 L90 20 L100 21'
    },
    {
      id: 4, name: 'BNB', symbol: 'BNB', price: '$602.19', h1: '0.1%', h24: '1.1%', d7: '6.9%', 
      h24Volume: '$594,615,715', marketCap: '$90,061,724,071', trend: 'up', 
      icon: 'B', iconBg: 'bg-yellow-50', iconColor: 'text-yellow-600', hasBuyButton: true,
      sparklinePath: 'M0 38 L10 30 L20 25 L35 32 L50 20 L65 15 L80 10 L100 5'
    },
    {
      id: 5, name: 'Solana', symbol: 'SOL', price: '$186.42', h1: '0.4%', h24: '2.2%', d7: '12.5%', 
      h24Volume: '$4,120,441,912', marketCap: '$83,412,661,002', trend: 'down', 
      icon: 'S', iconBg: 'bg-purple-50', iconColor: 'text-purple-600', hasBuyButton: true,
      sparklinePath: 'M0 5 L15 10 L30 18 L45 25 L60 30 L75 35 L100 38'
    }
  ];

  return (
    <>
      {/* BEGIN: Main Content Tabs */}
      
      <section className="flex flex-wrap items-center justify-between gap-4 mb-6" data-purpose="table-filters">
        <div className="flex flex-wrap gap-2">
          {['All', 'Highlights', 'Base Ecosystem', 'Artificial Intelligence (AI)', 'Intent'].map((tab, idx) => (
            <button
              key={tab}
              className={`px-4 py-1.5 rounded-lg text-sm transition ${
                idx === 0 ? 'bg-emerald-100 text-emerald-700 font-bold' : 'hover:bg-gray-100 text-gray-600 font-semibold'
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

      {/* BEGIN: Price Table */}
      <div className="table-container overflow-x-auto border border-gray-200 rounded-xl" data-purpose="crypto-price-table">
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
            {coins.map((coin) => (
              <tr key={coin.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-5 text-gray-400">{coin.id}</td>
                <td className="px-4 py-5">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full ${coin.iconBg} flex items-center justify-center ${coin.iconColor} font-bold text-lg`}>
                      {coin.icon}
                    </div>
                    <div>
                      <span className="block font-bold">{coin.name}</span>
                      <span className="text-xs text-gray-500 uppercase">{coin.symbol}</span>
                    </div>
                    {coin.hasBuyButton && (
                      <button className="bg-emerald-50 text-emerald-600 text-[10px] font-extrabold px-1.5 py-0.5 rounded border border-emerald-100">
                        BUY
                      </button>
                    )}
                  </div>
                </td>
                <td className="px-4 py-5 text-right font-bold">{coin.price}</td>
                <td className={`px-4 py-5 text-right ${coin.id === 5 ? 'text-down' : coin.id === 3 ? 'text-down' : 'text-up'}`}>{coin.h1}</td>
                <td className={`px-4 py-5 text-right ${coin.id === 5 ? 'text-down' : 'text-up'}`}>{coin.h24}</td>
                <td className="px-4 py-5 text-right text-up">{coin.d7}</td>
                <td className="px-4 py-5 text-right">{coin.h24Volume}</td>
                <td className="px-4 py-5 text-right">{coin.marketCap}</td>
                <td className="px-4 py-5">
                  <svg
                    className={`w-32 h-10 mx-auto ${coin.trend === 'up' ? 'text-up' : coin.trend === 'down' ? 'text-down' : 'text-gray-400'}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 100 40"
                  >
                    <path d={coin.sparklinePath} />
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* BEGIN: Pagination Info */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
        <p>Showing 1 - 100 of 14,284 cryptocurrencies</p>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Previous</button>
          <button className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded font-bold">1</button>
          <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">2</button>
          <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">3</button>
          <span className="px-2">...</span>
          <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">143</button>
          <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Next</button>
        </div>
      </div>
    </>
  )
}

export default CryptoTable