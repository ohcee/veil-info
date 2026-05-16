import React, { useState, useEffect } from "react";

const API_BASE = "https://explorer-api.veil-project.com";
const COINGECKO_URL =
  "https://api.coingecko.com/api/v3/coins/veil?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false";

const VeilMarketData = () => {
  const [marketData, setMarketData] = useState(null);
  const [nonkycData, setNonkycData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarket = async () => {
      try {
        const response = await fetch(COINGECKO_URL);
        const data = await response.json();
        setMarketData(data.market_data);
        setError(null);
      } catch (err) {
        console.error("CoinGecko fetch error:", err);
        setError(err);
      }
    };

    const fetchNonkyc = async () => {
      try {
        // NonKYC VEIL/USDT ticker via their public API
        const response = await fetch(
          "https://nonkyc.io/api/v2/market/getbysymbol/VEIL_USDT"
        );
        const data = await response.json();
        setNonkycData(data);
      } catch (err) {
        // NonKYC may block direct browser calls — silently fail
        console.warn("NonKYC fetch failed:", err);
      }
    };

    fetchMarket();
    fetchNonkyc();

    const marketInterval = setInterval(fetchMarket, 60000);
    const nonkycInterval = setInterval(fetchNonkyc, 60000);

    return () => {
      clearInterval(marketInterval);
      clearInterval(nonkycInterval);
    };
  }, []);

  if (error) return <div>Error loading market data: {error.message}</div>;
  if (!marketData) return <div>Loading market data...</div>;

  return (
    <div>
      <h3>Market Data</h3>
      <table>
        <tbody>
          <tr className="table-row">
            <td className="table-cell">Current Price (USD):</td>
            <td className="table-cell">
              ${marketData?.current_price?.usd?.toFixed(8)}
            </td>
          </tr>
          <tr className="table-row">
            <td className="table-cell">Market Cap (USD):</td>
            <td className="table-cell">
              {marketData?.market_cap?.usd?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </td>
          </tr>
          <tr className="table-row">
            <td className="table-cell">Total Volume (USD):</td>
            <td className="table-cell">
              ${marketData?.total_volume?.usd?.toFixed(2)}
            </td>
          </tr>
          <tr className="table-row">
            <td className="table-cell">Total Volume (BTC):</td>
            <td className="table-cell">
              {marketData?.total_volume?.btc?.toFixed(8)}
            </td>
          </tr>
          <tr className="table-row">
            <td className="table-cell">24h High (USD):</td>
            <td className="table-cell">
              ${marketData?.high_24h?.usd?.toFixed(6)}
            </td>
          </tr>
          <tr className="table-row">
            <td className="table-cell">24h Low (USD):</td>
            <td className="table-cell">
              ${marketData?.low_24h?.usd?.toFixed(6)}
            </td>
          </tr>
          <tr className="table-row">
            <td className="table-cell">24h Change:</td>
            <td
              className="table-cell"
              style={{
                color:
                  marketData?.price_change_percentage_24h >= 0
                    ? "#4caf50"
                    : "#f44336",
              }}
            >
              {marketData?.price_change_percentage_24h?.toFixed(2)}%
            </td>
          </tr>
          <tr className="table-row">
            <td className="table-cell">Circulating Supply:</td>
            <td className="table-cell">
              {marketData?.circulating_supply?.toLocaleString()} / 300,000,000
            </td>
          </tr>
        </tbody>
      </table>
      <h6>
        Data from{" "}
        <a
          href="https://www.coingecko.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          CoinGecko
        </a>
      </h6>

      <h3>Exchanges</h3>
      <h5>
        <a
          href="https://nonkyc.io/market/VEIL_USDT"
          target="_blank"
          rel="noopener noreferrer"
        >
          NonKYC VEIL-USDT
        </a>
      </h5>
      <h5>
        <a
          href="https://nonkyc.io/market/VEIL_BTC"
          target="_blank"
          rel="noopener noreferrer"
        >
          NonKYC VEIL-BTC
        </a>
      </h5>
      <h5>
        <a
          href="https://nonkyc.io/market/VEIL_XMR"
          target="_blank"
          rel="noopener noreferrer"
        >
          NonKYC VEIL-XMR
        </a>
      </h5>
    </div>
  );
};

export default VeilMarketData;
