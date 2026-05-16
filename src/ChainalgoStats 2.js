import React, { useState, useEffect } from "react";
import { PieChart } from "react-minimal-pie-chart";

const API_BASE = "https://explorer-api.veil-project.com";

function ChainalgoStats() {
  const [chainalgoStats, setChainalgoStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/GetChainalgoStats`);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();
        setChainalgoStats(data);
        setError(null);
      } catch (err) {
        console.error("ChainalgoStats fetch error:", err);
        setError(err);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  if (error) return <div>Error: {error.message}</div>;
  if (!chainalgoStats) return <div>Loading...</div>;

  const total =
    chainalgoStats.pos +
    chainalgoStats.progpow +
    chainalgoStats.randomx +
    chainalgoStats.sha256d;

  const data = [
    { title: "PoS", value: (chainalgoStats.pos / total) * 100, color: "#3890c8" },
    { title: "ProgPow", value: (chainalgoStats.progpow / total) * 100, color: "#105aef" },
    { title: "RandomX", value: (chainalgoStats.randomx / total) * 100, color: "#4273b9" },
    { title: "SHA256d", value: (chainalgoStats.sha256d / total) * 100, color: "#1034a6" },
  ];

  return (
    <div>
      <h3>Block Split</h3>
      <table>
        <tbody>
          <tr className="table-row">
            <td className="table-cell" style={{ color: "#3890c8" }}>
              (Proof-of-Stake)
            </td>
            <td>50% daily blocks</td>
            <td className="table-cell">{chainalgoStats.pos} / 720</td>
          </tr>
          <tr className="table-row">
            <td className="table-cell" style={{ color: "#105aef" }}>
              (ProgPow)
            </td>
            <td>35% daily blocks</td>
            <td className="table-cell">{chainalgoStats.progpow} / 504</td>
          </tr>
          <tr className="table-row">
            <td className="table-cell" style={{ color: "#4273b9" }}>
              (RandomX)
            </td>
            <td>10% daily blocks</td>
            <td className="table-cell">{chainalgoStats.randomx} / 144</td>
          </tr>
          <tr className="table-row">
            <td className="table-cell" style={{ color: "#1034a6" }}>
              (SHA256d)
            </td>
            <td>5% daily blocks</td>
            <td className="table-cell">
              {chainalgoStats.sha256d}
              <span> / 72</span>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="bottom-border">
        <div style={{ width: "255px", height: "255px", margin: "1px", padding: "12%" }}>
          <PieChart
            data={data}
            lineWidth={100}
            label={({ dataEntry }) =>
              `${dataEntry.title}: ${dataEntry.value.toFixed(2)}%`
            }
            labelStyle={{
              fontSize: "5px",
              fontWeight: "bolder",
              overflow: "ellipsis",
            }}
          />
        </div>
      </div>

      <h4>
        <p>Last 24 Hour Block Split</p>
      </h4>
    </div>
  );
}

export default ChainalgoStats;
