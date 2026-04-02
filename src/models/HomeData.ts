// types/coingecko.ts (atau simpan di atas fungsi)
export interface GlobalData {
  data: {
    active_cryptocurrencies: number;
    upcoming_icos: number;
    ongoing_icos: number;
    ended_icos: number;
    markets: number;
    // Menggunakan Record<string, number> karena kuncinya (mata uang) bisa sangat banyak
    total_market_cap: Record<string, number>;
    total_volume: Record<string, number>;
    market_cap_percentage: Record<string, number>;
    market_cap_change_percentage_24h_usd: number;
    // Field baru yang ada di respons tapi belum ada di interface kamu
    volume_change_percentage_24h_usd: number; 
    updated_at: number;
  }
}

export interface TrendingCoin {
  item: {
    id: string;
    coin_id: number;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    small: string;
    large: string;
    slug: string;
    price_btc: number;
    score: number;
    data: {
      price: number;
      price_btc: string;
      price_change_percentage_24h: {
        usd: number;
        idr: number;
      };
      market_cap: string;
      total_volume: string;
      sparkline: string;
    };
  };
}

export interface TrendingResponse {
  coins: TrendingCoin[];
}