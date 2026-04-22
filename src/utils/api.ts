import type { GlobalData, TrendingResponse, MarketCoin } from '../models/HomeData'

const BASE_URL = 'https://api.coingecko.com/api/v3'
const apiKey = import.meta.env.VITE_COINGECKO_API_KEY

const options: RequestInit = {
    method: 'GET',
    headers: {
      'x-cg-demo-api-key': apiKey || '',
      'Accept': 'application/json'
  }
}

const fetchGlobalStats = async (): Promise<GlobalData | null> => {
  // Mengambil API Key dari environment variable

  try {
    const response = await fetch(`${BASE_URL}/global`, options)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result: GlobalData = await response.json()
    return result
  } catch (err) {
    console.error("Gagal mengambil data global:", err)
    return null
  }
}

/**
 * Mengambil daftar koin yang sedang trending di CoinGecko
 */
const fetchTrendingCoins = async (): Promise<TrendingResponse | null> => {
  try {
    const response = await fetch(`${BASE_URL}/search/trending`, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: TrendingResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Gagal mengambil data trending:", error)
    return null;
  }
}

/**
 * Mengambil data pasar koin (untuk tabel) dengan pagination
 */
const fetchCoinsMarkets = async (page: number = 1, perPage: number = 100): Promise<MarketCoin[] | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=true&price_change_percentage=1h,24h,7d`,
      options
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: MarketCoin[] = await response.json();
    return data;
  } catch (error) {
    console.error("Gagal mengambil data koin markets:", error);
    return null;
  }
}


export { fetchGlobalStats, fetchTrendingCoins, fetchCoinsMarkets }