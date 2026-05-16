import React, { useState, useEffect } from "react";
import { EXPLORER_API } from "./config";

const formatGB = (bytes) => {
  if (!bytes) return "—";
  return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
};

const Arrow = ({ current, prev }) => {
  if (prev === null || current === prev) return <span style={{color:'#8b949e'}}> —</span>;
  if (current > prev) return <span style={{color:'#00ff88'}}> ▲</span>;
  return <span style={{color:'#ff4d6d'}}> ▼</span>;
};

function BlockchainInfo() {
  const [info, setInfo] = useState(null);
  const [prevInfo, setPrevInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${EXPLORER_API}/api/GetBlockchainInfo`);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();
        setPrevInfo(prev => prev === null ? null : prev);
        setInfo(current => {
          setPrevInfo(current);
          return data;
        });
        setError(null);
      } catch (err) { setError(err); }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 15000);
    return () => clearInterval(intervalId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <div>Error loading blockchain info</div>;
  if (!info) return <div>Loading...</div>;

  return (
    <div style={{display:'flex', flexDirection:'column', height:'100%'}}>
      <h3>Difficulty</h3>
      <table>
        <tbody>
          <tr className="table-row">
            <td className="table-cell" style={{color:"#38bdf8"}}>PoS</td>
            <td style={{color:"#38bdf8"}}>
              {Number(info.difficulty_pos).toLocaleString(undefined,{maximumFractionDigits:0})}
              <Arrow current={info.difficulty_pos} prev={prevInfo?.difficulty_pos ?? null} />
            </td>
          </tr>
          <tr className="table-row">
            <td className="table-cell" style={{color:"#c084fc"}}>ProgPow</td>
            <td style={{color:"#c084fc"}}>
              {Number(info.difficulty_progpow).toLocaleString(undefined,{maximumFractionDigits:2})}
              <Arrow current={info.difficulty_progpow} prev={prevInfo?.difficulty_progpow ?? null} />
            </td>
          </tr>
          <tr className="table-row">
            <td className="table-cell" style={{color:"#00ff88"}}>RandomX</td>
            <td style={{color:"#00ff88"}}>
              {Number(info.difficulty_randomx).toLocaleString(undefined,{maximumFractionDigits:4})}
              <Arrow current={info.difficulty_randomx} prev={prevInfo?.difficulty_randomx ?? null} />
            </td>
          </tr>
          <tr className="table-row">
            <td className="table-cell" style={{color:"#fb923c"}}>SHA256d</td>
            <td style={{color:"#fb923c"}}>
              {Number(info.difficulty_sha256d).toLocaleString(undefined,{maximumFractionDigits:0})}
              <Arrow current={info.difficulty_sha256d} prev={prevInfo?.difficulty_sha256d ?? null} />
            </td>
          </tr>
          <tr className="table-row">
            <td className="table-cell">Chain Size</td>
            <td>{formatGB(info.size_on_disk)}</td>
          </tr>
        </tbody>
      </table>

      <div className="border-bottom" />
      <h3>Mining Software</h3>
      <ul>
        <li><h2><a href="https://github.com/trexminer/T-Rex" target="_blank" rel="noopener noreferrer">T-Rex Miner (Nvidia)</a></h2></li>
        <li><h2><a href="https://github.com/andru-kun/wildrig-multi" target="_blank" rel="noopener noreferrer">Wildrig (AMD & Nvidia)</a></h2></li>
        <li><h2><a href="https://github.com/TrailingStop/TT-Miner-release" target="_blank" rel="noopener noreferrer">TT-Miner (Nvidia)</a></h2></li>
        <li><h2><a href="https://github.com/us77ipis/xmrig-veil" target="_blank" rel="noopener noreferrer">XMRig (CPU)</a></h2></li>
        <li><h2><a href="https://github.com/us77ipis/veil-node-stratum-proxy" target="_blank" rel="noopener noreferrer">Solo Mining Proxy</a></h2></li>
      </ul>

      <div className="border-bottom" />
      <h3>Pools</h3>
      <ul>
        <li><h2><a href="https://fastpool.xyz/veil-rx/" target="_blank" rel="noopener noreferrer">Fastpool (RandomX)</a></h2></li>
      </ul>
    </div>
  );
}

export default BlockchainInfo;
