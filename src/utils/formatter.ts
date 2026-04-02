/**
 * Memformat angka menjadi string dengan pemisah ribuan
 * Contoh: 18091 -> 18,091
 */
export const formatNumberWithCommas = (value: number): string => {
  return value.toLocaleString('en-US')
}

/**
 * Memotong desimal tanpa pembulatan berlebih (Truncate/Fixed)
 * Contoh: 56.62648141491447 -> 56.6
 * @param value - Angka yang akan diformat
 * @param decimals - Jumlah angka di belakang koma (default: 1)
 */
export const formatDecimal = (value: number, decimals: number = 1): string => {
  // Menggunakan toFixed untuk konsistensi UI
  return value.toFixed(decimals)
}

/**
 * Gabungan: Format ribuan sekaligus desimal
 * Contoh: 1234567.891 -> 1,234,567.9
 */
export const formatCryptoValue = (value: number, decimals: number = 1): string => {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })
}

// utils/formatter.ts
// Hasil: 147021299294 -> $147.021B
export const formatCurrencyCompact = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 3, // Agar muncul 3 angka di belakang titik (147.021)
  }).format(value);
};

