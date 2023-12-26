import React, { useState, useEffect } from "react";

const VeilMarketData = () => {
  const [marketData, setMarketData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/veil?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false"
      );
      const data = await response.json();
      setMarketData(data.market_data);
    };
    fetchData();
    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 60000); // Fetch every minute

    return () => clearInterval(intervalId); // Clean up the interval when the component unmounts
  }, []);

  return (
    <div>
      <h3>Market Data</h3> 
      <table>
        <tbody>
          <tr className="table-row">
            <td className="table-cell">Current Price (USD):</td>
            <td className="table-cell">${marketData?.current_price?.usd && marketData.current_price.usd.toFixed(8)}</td>
          </tr>
          <tr className="table-row">
    <td className="table-cell">Market Cap (USD):</td>
    <td className="table-cell">
        {marketData?.market_cap?.usd &&
            marketData.market_cap.usd.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            })}
    </td>
</tr>

          <tr className="table-row">
            <td className="table-cell">Total Volume (USD):</td>
            <td className="table-cell">${marketData?.total_volume?.usd && marketData.total_volume.usd.toFixed(2)}</td>
          </tr> 
          <tr className="table-row">
            <td className="table-cell">Total Volume (BTC):</td>
            <td className="table-cell">{marketData?.total_volume?.btc && marketData.total_volume.btc.toFixed(8)}</td>
          </tr>
          <tr className="table-row">
            <td className="table-cell">24h High (USD):</td>
            <td className="table-cell">${marketData?.high_24h?.usd && marketData.high_24h.usd.toFixed(6)}</td>
          </tr>
          <tr className="table-row">
            <td className="table-cell">24h Low (USD):</td>
            <td className="table-cell">${marketData?.low_24h?.usd && marketData.low_24h.usd.toFixed(6)}</td>
          </tr>
          <tr className="table-row">
            <td className="table-cell">Current Supply: </td>
            <td className="table-cell">{marketData?.total_supply && marketData.total_supply.toFixed(0)} /300000000</td>
          </tr> 
        </tbody>
      </table>
      <h6>Data from <a href="https://www.coingecko.com/" target="_blank" rel="noopener noreferrer">CoinGecko</a></h6>
      <h3>Exchanges</h3>
      <h5><a href="https://tradeogre.com/exchange/BTC-VEIL" target="_blank" rel="noopener noreferrer">Tradeogre VEIL-BTC</a> </h5>
      <h5><a href="https://www.probit.com/app/exchange/VEIL-USDT" target="_blank" rel="noopener noreferrer">Probit VEIL-USDT</a> </h5>
      <h5><a href="https://www.probit.com/app/exchange/VEIL-BTC" target="_blank" rel="noopener noreferrer">Probit VEIL-BTC</a> </h5>
      <h5><a href="https://nonkyc.io/market/VEIL_XMR" target="_blank" rel="noopener noreferrer">Nokyc VEIL-XMR</a> </h5>
      <h5><a href="https://nonkyc.io/market/VEIL_USDT" target="_blank" rel="noopener noreferrer">Nokyc VEIL-USDT</a> </h5>
      <h5><a href="https://nonkyc.io/market/VEIL_BTC" target="_blank" rel="noopener noreferrer">Nokyc VEIL-BTC</a> </h5>
    </div>
  );
}; 

export default VeilMarketData;

