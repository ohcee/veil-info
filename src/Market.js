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
    const intervalId = setInterval(fetchData, 120000); // Fetch every 2 minutes

    return () => clearInterval(intervalId); // Clean up the interval when the component unmounts
  }, []);

  return (
    <div>
      <h4>Market Data</h4> 
      <table>
        <tbody>
          <tr className="table-row">
            <td className="table-cell">Current Price (BTC):</td>
            <td className="table-cell">{marketData?.current_price?.btc && marketData.current_price.btc.toFixed(8)}</td>
          </tr>
          <tr className="table-row">
            <td className="table-cell">Market Cap (BTC):</td>
            <td className="table-cell">{marketData?.market_cap?.btc && marketData.market_cap.btc.toFixed(8)}</td>
          </tr>
          <tr className="table-row">
            <td className="table-cell">Market Cap Rank:</td>
            <td className="table-cell">#{marketData?.market_cap_rank}</td>
          </tr>
          <tr className="table-row">
            <td className="table-cell">Total Volume (BTC):</td>
            <td className="table-cell">{marketData?.total_volume?.btc && marketData.total_volume.btc.toFixed(8)}</td>
          </tr>
          <tr className="table-row">
            <td className="table-cell">24h High (BTC):</td>
            <td className="table-cell">{marketData?.high_24h?.btc && marketData.high_24h.btc.toFixed(8)}</td>
          </tr>
          <tr className="table-row">
            <td className="table-cell">24h Low (BTC):</td>
            <td className="table-cell">{marketData?.low_24h?.btc && marketData.low_24h.btc.toFixed(8)}</td>
          </tr>
          <tr className="table-row">
            <td className="table-cell">Current Supply: </td>
            <td className="table-cell">{marketData?.total_supply && marketData.total_supply.toFixed(0)} /300000000</td>
          </tr> 
        </tbody>
      </table>
      <h6>Data from <a href="https://www.coingecko.com/" target="_blank" rel="noopener noreferrer">CoinGecko</a></h6>
      <h4>Exchanges</h4>
      <h4><a href="https://tradeogre.com/exchange/BTC-VEIL" target="_blank" rel="noopener noreferrer">Tradeogre VEIL-BTC</a> </h4>
      <h4><a href="https://www.probit.com/app/exchange/VEIL-USDT" target="_blank" rel="noopener noreferrer">Probit VEIL-USDT</a> </h4>
      <h4><a href="https://www.probit.com/app/exchange/VEIL-BTC" target="_blank" rel="noopener noreferrer">Probit VEIL-BTC</a> </h4>
    </div>
  );
}; 

export default VeilMarketData;

