import React, { useState, useEffect, useRef, useContext } from "react";
import DataContext from "./DataContext";

const VeilMarketData = () => {
  const { market } = useContext(DataContext);
  const usdtData = market?.usdt ?? null;
  const btcData = market?.btc ?? null;
  const xmrData = market?.xmr ?? null;
  const usdcData = market?.usdc ?? null;

  const [flash, setFlash] = useState(false);
  const prevPrice = useRef(null);

  useEffect(() => {
    if (!usdtData) return;
    const newPrice = parseFloat(usdtData.lastPrice || 0);
    if (prevPrice.current !== null && prevPrice.current !== newPrice) {
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 800);
      prevPrice.current = newPrice;
      return () => clearTimeout(t);
    }
    prevPrice.current = newPrice;
  }, [usdtData?.lastPrice, usdtData]);

  if (!usdtData) return <div>Loading market data...</div>;

  const price = parseFloat(usdtData?.lastPrice || 0);
  const volumeVeil = parseFloat(usdtData?.volumeNumber || 0)
    + parseFloat(btcData?.volumeNumber || 0)
    + parseFloat(xmrData?.volumeNumber || 0)
    + parseFloat(usdcData?.volumeNumber || 0);
  const volumeUSD = parseFloat(usdtData?.volumeUsdNumber || 0)
    + parseFloat(btcData?.volumeUsdNumber || 0)
    + parseFloat(xmrData?.volumeUsdNumber || 0)
    + parseFloat(usdcData?.volumeUsdNumber || 0);
  const change = parseFloat(usdtData?.changePercentNumber || 0);

  return (
    <div className={flash ? "flash-green" : ""}>
      <h3>Market Data</h3>
      <table>
        <tbody>
          <tr className="table-row">
            <td className="table-cell">Price USDT</td>
            <td style={{color: usdtData?.lastPriceUpDown === 'up' ? '#00ff88' : '#ff4d6d', fontWeight:"700"}}>
              ${price.toFixed(6)}
            </td>
          </tr>
          {usdcData && (
            <tr className="table-row">
              <td className="table-cell">Price USDC</td>
              <td style={{color: usdcData?.lastPriceUpDown === 'up' ? '#00ff88' : '#ff4d6d', fontWeight:"700"}}>
                ${parseFloat(usdcData?.lastPrice || 0).toFixed(6)}
              </td>
            </tr>
          )}
          <tr className="table-row">
            <td className="table-cell">Price BTC</td>
            <td style={{color: btcData?.lastPriceUpDown === 'up' ? '#00ff88' : '#ff4d6d', fontWeight:"700"}}>
              {parseFloat(btcData?.lastPrice || 0).toFixed(8)}
            </td>
          </tr>
          <tr className="table-row">
            <td className="table-cell">Price XMR</td>
            <td style={{color: xmrData?.lastPriceUpDown === 'up' ? '#00ff88' : '#ff4d6d', fontWeight:"700"}}>
              {parseFloat(xmrData?.lastPrice || 0).toFixed(8)}
            </td>
          </tr>
          <tr className="table-row">
            <td className="table-cell">24h Vol (VEIL)</td>
            <td>{volumeVeil.toLocaleString(undefined,{maximumFractionDigits:0})}</td>
          </tr>
          <tr className="table-row">
            <td className="table-cell">24h Vol (USD)</td>
            <td>${volumeUSD.toLocaleString(undefined,{maximumFractionDigits:2})}</td>
          </tr>
          <tr className="table-row">
            <td className="table-cell">24h High</td>
            <td>${parseFloat(usdtData?.highPrice || 0).toFixed(6)}</td>
          </tr>
          <tr className="table-row">
            <td className="table-cell">24h Low</td>
            <td>${parseFloat(usdtData?.lowPrice || 0).toFixed(6)}</td>
          </tr>
          <tr className="table-row">
            <td className="table-cell">24h Change</td>
            <td style={{color: change >= 0 ? "#00ff88" : "#ff4d6d", fontWeight:"700"}}>
              {change >= 0 ? "▲" : "▼"} {Math.abs(change).toFixed(2)}%
            </td>
          </tr>
        </tbody>
      </table>
      <h6>Live · <a href="https://nonkyc.io" target="_blank" rel="noopener noreferrer">NonKYC</a></h6>

      <div className="border-bottom" />

      <h3 style={{marginTop:'14px'}}>Exchanges</h3>
      <ul>
        <li><h2><a href="https://nonkyc.io/market/VEIL_USDT" target="_blank" rel="noopener noreferrer">NonKYC · VEIL-USDT</a></h2></li>
        <li><h2><a href="https://nonkyc.io/market/VEIL_USDC" target="_blank" rel="noopener noreferrer">NonKYC · VEIL-USDC</a></h2></li>
        <li><h2><a href="https://nonkyc.io/market/VEIL_BTC" target="_blank" rel="noopener noreferrer">NonKYC · VEIL-BTC</a></h2></li>
        <li><h2><a href="https://nonkyc.io/market/VEIL_XMR" target="_blank" rel="noopener noreferrer">NonKYC · VEIL-XMR</a></h2></li>
      </ul>
    </div>
  );
};

export default VeilMarketData;
