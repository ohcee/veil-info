// Cloudflare Worker proxy URL
export const PROXY = "https://veil-info-proxy.donkeybabe123.workers.dev";

export const EXPLORER_API = `${PROXY}/explorer`;
export const NONKYC_XMR = `${PROXY}/nonkyc-xmr`;
export const NONKYC_BTC = `${PROXY}/nonkyc-btc`;
export const NONKYC_USDT = `${PROXY}/nonkyc-usdt`;
export const NONKYC_USDC = `${PROXY}/nonkyc-usdc`;

// CoinGecko commented out — low volume makes aggregated data unreliable
// export const COINGECKO = `${PROXY}/coingecko`;
