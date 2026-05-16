import React, { useState, useEffect } from "react";

const API_BASE = "https://explorer-api.veil-project.com";

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

function BlockchainInfo() {
  const [blockchainInfo, setBlockchainInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/GetBlockchainInfo`);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();
        setBlockchainInfo({
          difficulty_randomx: data.difficulty_randomx,
          difficulty_progpow: data.difficulty_progpow,
          difficulty_sha256d: data.difficulty_sha256d,
          difficulty_pos: data.difficulty_pos,
          size_on_disk: data.size_on_disk,
          size_on_disk_formatted: formatBytes(data.size_on_disk, 2),
        });
        setError(null);
      } catch (err) {
        console.error("BlockchainInfo fetch error:", err);
        setError(err);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  if (error) return <div>Error loading blockchain info: {error.message}</div>;
  if (!blockchainInfo) return <div>Loading blockchain info...</div>;

  return (
    <div>
      <h3>Difficulty Data</h3>
      <table>
        <tbody>
          <tr className="table-row">
            <td className="table-cell" style={{ color: "#3890c8" }}>
              (PoS) Difficulty
            </td>
            <td className="table-cell">{blockchainInfo.difficulty_pos}</td>
          </tr>
          <tr className="table-row">
            <td className="table-cell" style={{ color: "#105aef" }}>
              (ProgPow) Difficulty
            </td>
            <td className="table-cell">{blockchainInfo.difficulty_progpow}</td>
          </tr>
          <tr className="table-row">
            <td className="table-cell" style={{ color: "#4273b9" }}>
              (RandomX) Difficulty
            </td>
            <td className="table-cell">{blockchainInfo.difficulty_randomx}</td>
          </tr>
          <tr className="table-row">
            <td className="table-cell" style={{ color: "#1034a6" }}>
              (Sha256D) Difficulty
            </td>
            <td className="table-cell">{blockchainInfo.difficulty_sha256d}</td>
          </tr>
          <tr className="table-row">
            <td className="table-cell">Chain Size:</td>
            <td className="table-cell">
              {blockchainInfo.size_on_disk_formatted}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="border-bottom"></div>

      <h3>Mining Software</h3>
      <ul>
        <li>
          <h3>
            <a
              href="https://github.com/trexminer/T-Rex"
              target="_blank"
              rel="noopener noreferrer"
            >
              T-Rex Miner (Nvidia)
            </a>
          </h3>
        </li>
        <li>
          <h3>
            <a
              href="https://github.com/andru-kun/wildrig-multi"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wildrig-Miner (AMD & Nvidia)
            </a>
          </h3>
        </li>
        <li>
          <h3>
            <a
              href="https://github.com/TrailingStop/TT-Miner-release"
              target="_blank"
              rel="noopener noreferrer"
            >
              TT-Miner (Nvidia)
            </a>
          </h3>
        </li>
        <li>
          <h3>
            <a
              href="https://github.com/us77ipis/xmrig-veil"
              target="_blank"
              rel="noopener noreferrer"
            >
              XMRIG (CPU)
            </a>
          </h3>
        </li>
        <li>
          <h3>
            <a
              href="https://github.com/us77ipis/veil-node-stratum-proxy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Solo Mining Proxy
            </a>
          </h3>
        </li>
      </ul>

      <h3>Pools</h3>
      <ul>
        <li>
          <h3>
            <a
              href="https://fastpool.xyz/veil-rx/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fastpool (RandomX)
            </a>
          </h3>
        </li>
      </ul>
    </div>
  );
}

export default BlockchainInfo;
