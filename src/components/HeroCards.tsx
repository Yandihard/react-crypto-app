import React from 'react'
import { type TrendingCoin } from '../models/HomeData'

interface HeroCardsProps {
  data: TrendingCoin[]
}
// --- Sub-komponen untuk baris koin di Trending & Gainers ---
interface CoinRowProps {
  initial: string
  name: string
  symbol: string
  price: string
  change: string
  isUp: boolean
  bgColor: string
  textColor: string
}

const CoinRow: React.FC<CoinRowProps> = ({ 
  initial, name, symbol, price, change, isUp, bgColor, textColor 
}) => (
  <div className="flex justify-between items-center text-sm">
    <div className="flex items-center space-x-2">
      <div className={`w-6 h-6 ${bgColor} rounded-full flex items-center justify-center font-bold text-[10px] ${textColor}`}>
        {initial}
      </div>
      <span className="font-medium">
        {name} <span className="text-gray-400 font-normal">{symbol}</span>
      </span>
    </div>
    <span className={`${isUp ? 'text-up' : 'text-down'} font-semibold`}>
      {price} <span className="text-[10px] ml-1">{change}</span>
    </span>
  </div>
);

const HeroCards: React.FC<HeroCardsProps> = ({ data }) => {
  return (
    <>
      {/* BEGIN: Hero Header */}
      <section className="mb-10">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">
          Cryptocurrency Prices by Market Cap
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
          The global cryptocurrency market cap today is $2.68 Trillion, a{' '}
          <span className="text-up font-medium">1.4% change</span> in the last 24 hours.{' '}
          <a className="text-emerald-600 hover:underline" href="#">Read more</a>
        </p>
      </section>
      {/* END: Hero Header */}

      {/* BEGIN: Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10" data-purpose="market-summary-cards">
        
        {/* Market Cap Summary */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Global Market Cap</p>
              <h3 className="text-xl font-bold text-gray-900 mt-1">$2,684,102,394,155</h3>
              <span className="text-sm text-up font-medium flex items-center mt-1">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path 
                    fillRule="evenodd" 
                    clipRule="evenodd" 
                    d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" 
                  />
                </svg>
                1.4%
              </span>
            </div>
            {/* Sparkline Emerald */}
            <svg className="w-24 h-12 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 100 40">
              <path d="M0 35 Q 20 25, 40 30 T 80 10 T 100 5" />
            </svg>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">24h Trading Volume</p>
              <h3 className="text-xl font-bold text-gray-900 mt-1">$84,192,553,010</h3>
            </div>
            {/* Sparkline Red */}
            <svg className="w-24 h-8 text-red-500 mt-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 100 40">
              <path d="M0 5 Q 25 15, 50 10 T 75 30 T 100 35" />
            </svg>
          </div>
        </div>

        {/* Trending Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold flex items-center">
              <span className="mr-2">🔥</span> Trending
            </h4>
            <a className="text-xs text-blue-600 font-semibold hover:underline" href="#">View more</a>
          </div>
          <div className="space-y-4">
            {data.slice(0, 3).map((coin) => {
              // Ekstraksi data agar kode di bawah lebih bersih
              const { id, name, symbol, small, data } = coin.item;
              const price = data.price.toFixed(4);
              const change = data.price_change_percentage_24h.usd.toFixed(2);
              const isUp = data.price_change_percentage_24h.usd >= 0;

              return (
                <div key={id} className="flex justify-between items-center text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center overflow-hidden">
                      <img src={small} alt={name} className="w-full h-full object-cover" />
                    </div>
                    <span className="font-medium">
                      {name} <span className="text-gray-400 font-normal uppercase">{symbol}</span>
                    </span>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <span className="font-semibold">${price}</span>
                    <span className={`${isUp ? 'text-green-500' : 'text-red-500'} text-[10px] font-bold`}>
                      {isUp ? '▲' : '▼'} {change}%
                    </span>
                  </div>
                </div>
                )
            })}
          </div>
        </div>

        {/* Top Gainers Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold flex items-center">
              <span className="mr-2">🚀</span> Top Gainers
            </h4>
            <a className="text-xs text-blue-600 font-semibold hover:underline" href="#">View more</a>
          </div>
          <div className="space-y-4">
            <CoinRow initial="A" name="Anoma" symbol="NOM" price="$0.0116" change="▲ 65.8%" isUp={true} bgColor="bg-red-100" textColor="text-red-600" />
            <CoinRow initial="T" name="Templar" symbol="TEM" price="$19.60" change="▲ 41.9%" isUp={true} bgColor="bg-purple-100" textColor="text-purple-600" />
            <CoinRow initial="D" name="dKargo" symbol="DKA" price="$0.0385" change="▲ 37.5%" isUp={true} bgColor="bg-cyan-100" textColor="text-cyan-600" />
          </div>
        </div>

      </section>
      {/* END: Summary Cards */}
    </>
  )
}

export default HeroCards