import React, { useState, useEffect, useRef } from "react";
import { NONKYC_USDT, NONKYC_BTC, NONKYC_XMR } from "./config";

const VeilMarketData = () => {
  const [usdtData, setUsdtData] = useState(null);
  const [btcData, setBtcData] = useState(null);
  const [xmrData, setXmrData] = useState(null);
  const [flash, setFlash] = useState(false);
  const prevPrice = useRef(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [usdtRes, btcRes, xmrRes] = await Promise.all([
          fetch(NONKYC_USDT),
          fetch(NONKYC_BTC),
          fetch(NONKYC_XMR),
        ]);
        const [usdt, btc, xmr] = await Promise.all([
          usdtRes.json(),
          btcRes.json(),
          xmrRes.json(),
        ]);
        const newPrice = parseFloat(usdt.lastPrice || 0);
        if (prevPrice.current !== null && prevPrice.current !== newPrice) {
          setFlash(true);
          setTimeout(() => setFlash(false), 800);
        }
        prevPrice.current = newPrice;
        setUsdtData(usdt);
        setBtcData(btc);
        setXmrData(xmr);
      } catch (err) { console.error(err); }
    };
    fetchAll();
    const intervalId = setInterval(fetchAll, 60000);
    return () => clearInterval(intervalId);
  }, []);

  if (!usdtData) return <div>Loading market data...</div>;

  const price = parseFloat(usdtData?.lastPrice || 0);
  const volumeVeil = parseFloat(usdtData?.volume || 0);
  // Volume from NonKYC is in base asset (VEIL) — convert to USD
  const volumeUSD = volumeVeil * price;
  const change = parseFloat(usdtData?.priceChangePercent || 0);

  return (
    <div className={flash ? "flash-green" : ""}>
      <h3>Market Data</h3>
      <table>
        <tbody>
          <tr className="table-row">
            <td className="table-cell">Price USDT</td>
            <td style={{color:"#00ff88", fontWeight:"700"}}>
              ${price.toFixed(6)}
            </td>
          </tr>
          <tr className="table-row">
            <td className="table-cell">Price BTC</td>
            <td>{parseFloat(btcData?.lastPrice || 0).toFixed(8)}</td>
          </tr>
          <tr className="table-row">
            <td className="table-cell">Price XMR</td>
            <td>{parseFloat(xmrData?.lastPrice || 0).toFixed(8)}</td>
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
        <li><h2><a href="https://nonkyc.io/market/VEIL_BTC" target="_blank" rel="noopener noreferrer">NonKYC · VEIL-BTC</a></h2></li>
        <li><h2><a href="https://nonkyc.io/market/VEIL_XMR" target="_blank" rel="noopener noreferrer">NonKYC · VEIL-XMR</a></h2></li>
      </ul>
    </div>
  );
};

export default VeilMarketData;
