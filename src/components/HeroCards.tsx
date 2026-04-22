import React, { useState } from 'react'
import { type TrendingCoin, type GlobalData } from '../models/HomeData'
import { formatCurrencyCompact, formatNumberWithCommas, formatDecimal } from '../utils/formatter'

interface HeroCardsProps {
  trendingData: TrendingCoin[]
  isTrendingLoading: boolean
  globalStats: GlobalData | null
  isGlobalLoading: boolean
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

const HeroCards: React.FC<HeroCardsProps> = ({
  trendingData,
  isTrendingLoading,
  globalStats,
  isGlobalLoading
}) => {
  const [showMore, setShowMore] = useState(false);

  const marketCap = globalStats?.data.total_market_cap.usd || 0;
  const marketCapChange = globalStats?.data.market_cap_change_percentage_24h_usd || 0;
  const volume24h = globalStats?.data.total_volume.usd || 0;
  const btcDominance = globalStats?.data.market_cap_percentage.btc || 0;
  const ethDominance = globalStats?.data.market_cap_percentage.eth || 0;
  const activeCoins = globalStats?.data.active_cryptocurrencies || 0;
  const isMarketUp = marketCapChange >= 0;

  return (
    <>
      {/* BEGIN: Hero Header */}
      <section className="mb-10">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">
          Cryptocurrency Prices by Market Cap
        </h1>
        {isGlobalLoading || !globalStats ? (
          <div className="h-4 w-2/3 bg-gray-200 animate-pulse rounded"></div>
        ) : (
          <div className="text-sm text-gray-600 leading-relaxed max-w-3xl">
            <p>
              The global cryptocurrency market cap today is {formatCurrencyCompact(marketCap)}, a{' '}
              <span className={`${isMarketUp ? 'text-up' : 'text-down'} font-medium`}>
                {Math.abs(marketCapChange).toFixed(1)}% change
              </span> in the last 24 hours.
              {' '}
              {showMore && (
                <span>
                  Total cryptocurrency trading volume in the last day is at {formatCurrencyCompact(volume24h)}.
                  Bitcoin dominance is at {formatDecimal(btcDominance)}% and Ethereum dominance is at {formatDecimal(ethDominance)}%.
                  CoinGecko is now tracking {formatNumberWithCommas(activeCoins)} cryptocurrencies.
                </span>
              )}
              <button
                onClick={() => setShowMore(!showMore)}
                className="text-emerald-600 hover:underline font-semibold ml-1 inline-block"
              >
                {showMore ? 'Hide' : 'Read more'}
              </button>
            </p>
          </div>
        )}
      </section>
      {/* END: Hero Header */}

      {/* BEGIN: Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10" data-purpose="market-summary-cards">

        {/* Market Cap Summary */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          {isGlobalLoading || !globalStats ? (
            <div className="animate-pulse space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="h-3 w-24 bg-gray-200 rounded"></div>
                  <div className="h-6 w-32 bg-gray-200 rounded"></div>
                  <div className="h-3 w-12 bg-gray-200 rounded"></div>
                </div>
                <div className="h-10 w-24 bg-gray-200 rounded"></div>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Global Market Cap</p>
                <h3 className="text-xl font-bold text-gray-900 mt-1">
                  ${formatNumberWithCommas(marketCap)}
                </h3>
                <span className={`text-sm ${isMarketUp ? 'text-up' : 'text-down'} font-medium flex items-center mt-1`}>
                  <svg className={`w-3 h-3 mr-1 ${!isMarketUp && 'rotate-180'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                    />
                  </svg>
                  {Math.abs(marketCapChange).toFixed(1)}%
                </span>
              </div>
              <svg className={`w-24 h-12 ${isMarketUp ? 'text-up' : 'text-down'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 100 40">
                <path d={isMarketUp ? "M0 35 L 20 25 L 40 30 L 60 15 L 80 10 L 100 5" : "M0 5 L 25 15 L 50 10 L 75 30 L 100 35"} />
              </svg>
            </div>
          )}
          <div className="flex justify-between items-start">
            {isGlobalLoading || !globalStats ? (
              <div className="animate-pulse space-y-2 mt-2">
                <div className="h-3 w-28 bg-gray-200 rounded"></div>
                <div className="h-6 w-36 bg-gray-200 rounded"></div>
              </div>
            ) : (
              <div>
                <p className="text-sm font-medium text-gray-500">24h Trading Volume</p>
                <h3 className="text-xl font-bold text-gray-900 mt-1">
                  ${formatNumberWithCommas(volume24h)}
                </h3>
              </div>
            )}
            <svg className={`w-24 h-8 ${isMarketUp ? 'text-up' : 'text-down'} mt-2`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 100 40">
              <path d="M0 20 L 25 10 L 50 25 L 75 15 L 100 20" />
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
            {isTrendingLoading || trendingData.length === 0 ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex justify-between items-center animate-pulse">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <div className="h-4 w-12 bg-gray-200 rounded"></div>
                    <div className="h-3 w-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))
            ) : (
              trendingData.slice(0, 3).map((coin) => {
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
              })
            )}
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

